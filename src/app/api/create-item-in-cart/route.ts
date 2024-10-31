import {
  CREATE_INSURANCE_AND_SHIPPING,
  CREATE_ITEM_IN_CART,
  CURRENT_CUSTOMER,
  CUSTOMER_CART,
} from "@/http/endpoints"
import getServerAuthSession from "@/lib/auth"
import { formatAxiosError } from "@/lib/utils"
import axios from "axios"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerAuthSession()
    if (!session?.accessToken) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }

    const { payload } = await req.json()
    const { valueToCheck } = payload?.valueRange
    if (payload.product_option && payload.product_option.extension_attributes) {
      payload.product_option.extension_attributes.custom_options.forEach(
        (option: any) => {
          delete option.price // Remove the price field
        }
      )
    }
    delete payload?.item_id
    delete payload?.valueRange

    try {
      const { data: cartData } = await axios.get(CUSTOMER_CART, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
      })

      const itemsInCart = cartData?.items
      const quote_id = cartData?.id

      const payloadToPass = {
        cartItem: {
          ...payload,
          quote_id,
        },
      }

      // // Add item to cart
      const { data } = await axios.post(CREATE_ITEM_IN_CART, payloadToPass, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
      })

      setTimeout(() => {
        axios.post(`${CREATE_INSURANCE_AND_SHIPPING}/?id=${cartData?.customer?.id}`, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          }
        })
      }, 1000)

      return NextResponse.json(data)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        try {
          const { data: customerData } = await axios.get(CURRENT_CUSTOMER, {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
              "Content-Type": "application/json",
            },
          })

          const { data: cartData } = await axios.post(
            CUSTOMER_CART,
            {},
            {
              headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          )

          const quote_id = cartData

          // Prepare the payload for adding an item to the cart
          const payloadToPass = {
            cartItem: {
              ...payload,
              quote_id,
            },
          }

          // Add item to cart
          const { data } = await axios.post(
            CREATE_ITEM_IN_CART,
            payloadToPass,
            {
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          )

          const customerId = customerData?.id


          setTimeout(() => {
            // TODO: Removing Await so it can't wait and return the response
            axios.post(`${CREATE_INSURANCE_AND_SHIPPING}/?id=${customerId?.id}`, {
              headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
              }
            })
          }, 1000)
          // Return the response with the data
          return NextResponse.json(data)
        } catch (createError) {
          throw createError // If cart creation fails, throw error
        }
      } else {
        throw error // Handle any other errors during cart fetch
      }
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { status, message } = formatAxiosError(error)
      return new Response(JSON.stringify({ message }), {
        status,
        headers: { "Content-Type": "application/json" },
      })
    } else {
      return new Response(
        JSON.stringify({ message: "An unknown error occurred" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      )
    }
  }
}

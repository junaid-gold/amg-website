import Link from "next/link"
import React from "react"

const Links = () => {
  return (
    <ul className="flex flex-wrap gap-4">
      <li>
        <Link
          className="text-[#9747FF] underline"
          href="https://docs.google.com/document/d/1aEnSRCDm2FtdHJ3Pn8eX9Bk5vTfaX4ivJvUGaw2qUSc/edit"
        >
          Repair policy
        </Link>
      </li>
      <li>
        <Link
          className="text-[#9747FF] underline"
          href="https://docs.google.com/document/d/1z0rqvYRo3ez66mRY0sywYPiaDBDcZ1e8Dw56PlOdJ-I/edit"
        >
          Privacy policy
        </Link>
      </li>
      <li>
        <Link
          className="text-[#9747FF] underline"
          href="https://docs.google.com/document/d/1zHzLPMHz6USvRZIqgklelRbl7f-i2ik7/edit"
        >
          Terms of service
        </Link>
      </li>
    </ul>
  )
}

export default Links

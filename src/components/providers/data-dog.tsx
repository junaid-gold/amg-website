"use client"
import React, { useEffect } from 'react'
import { datadogRum } from '@datadog/browser-rum';


const DataDog = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Datadog RUM
            datadogRum.init({
                applicationId: 'd78dbca3-efb9-4fac-abf6-50c2dd3802e2',
                clientToken: 'pub809e7d1cbeac0c8386f06d110d60f8ff',
                site: 'us5.datadoghq.com',  // Set the Datadog site for your region
                service: 'amg',  // Name your service
                env: process.env.NEXT_PUBLIC_DATADOG_ENV || 'development',  // Environment (development/production)
                sessionSampleRate: 100,
                sessionReplaySampleRate: 20,
                trackUserInteractions: true,
                trackResources: true,
                trackLongTasks: true,
                defaultPrivacyLevel: 'mask-user-input',  // Mask sensitive user inputs
            });

            // Start session replay recording
            datadogRum.startSessionReplayRecording();
        }
    }, []);  // Ensure this runs only on the client

    return (
        <></>
    )
}

export default DataDog
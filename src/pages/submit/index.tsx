import React from 'react'
import PrimaryLayout from 'layout/PrimaryLayout'

function Index() {
    return (
        <PrimaryLayout>
            <div className="px-4 py-4 sm:px-0">
            <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">{/* Content goes here */}</div>
    </div>
            </div>
        </PrimaryLayout>
    )
}

export default Index
import dynamic from 'next/dynamic';
import React from 'react'
const PoliceMap = dynamic(() => import("@/components/Maps/Policemap"), {
    ssr: false,
  });

const PoliceLocation = () => {
  return (
    <div  className="pt-20 -z-10"><PoliceMap/></div>
  )
}

export default PoliceLocation
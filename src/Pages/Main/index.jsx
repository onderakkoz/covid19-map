import { useState } from "react";
import { Link } from "react-router-dom";
import {ComposableMap, Geographies, Geography, Graticule, Sphere, ZoomableGroup} from "react-simple-maps";

const geoUrl = "https://ismailarilik.com/react-covid-maps/geo.json";

const Main = () => {
  const [geo, setGeo] = useState();
  console.log(geo);

  return (
    <div
      className="h-[calc(100vh-74px)] bg-zinc-800 text-white overflow-hidden
       flex flex-col justify-center items-center md:pt-3 wrapper "
    >
      <h1 className="px-2 py-2 text-xl">
        Detay Görüntüle{" "}
       <span className="text-green-500"> {geo?.properties.name ? geo.properties.name : <span className="text-white">(Ülke Seçin)</span>}</span>
      </h1>

      <ComposableMap
        height={1000}
        projectionConfig={{ rotate: [-10, 0, 0], scale: 325 }}
      >
        <ZoomableGroup>
          <Graticule stroke="red" strokeWidth={0.3} />
          <Sphere stroke="red" strokeWidth={0.3} />
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (

                <Link to={`/detail?code=${geo.id}`}>
                <Geography
                  onMouseEnter={() => setGeo(geo)}
                  onMouseLeave={()=>setGeo(null)}
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: "white",
                    },
                    hover: {
                      fill: "rgb(54 220 94)",
                    },
                  }}
                />
                </Link>
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    
      <p><span className="text-green-500 mb-2">Önder AKKÖZ</span> tarafından tasarlanmıştır. Tüm hakları saklıdır. © </p>

    </div>

  
      
  
  );
};

export default Main;
import { render, screen } from "@testing-library/react";
import Detail from "../Pages/Detail";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import { exa_data } from "../constants";

// test ortamindaki sahte store'un kurulumunu yapiyoruz/arayazilim olan thunk'i import edip icinde belirtiyoruz
const mockStore = configureStore([thunk]);

it("Yuklenme durumunda loader bilesenleri ekrana basilir", () => {
  // Yuklenme durumundaki store'u simule ediyoruz
  const store = mockStore({ isLoading: true, error: null, data: null });

  // bileseni renderla
  render(
   <BrowserRouter>
    <Provider store={store}>
      <Detail />
    </Provider>
   </BrowserRouter>
  );

  // Loaderlar ekrana geliyormu kontrol et 
  screen.getByTestId("header-loader")
  screen.getAllByTestId("card-loader")

});

it("Hata durumunda error bileseni ekrana basilir", ()=>{
    const store = mockStore({
        isLoading:false,
        error:"404 content not found",
        data:null,
    })

    render(<Provider store={store}>
        <BrowserRouter>
        <Detail/>
        </BrowserRouter>
    </Provider>)

    // hata metnini iceren element ekrana basildi mi?
    screen.getByText(/404 content/i)
})



it("Veri gelme  durumunda ulke bilgisi ve kartlar ekrana basilir", ()=>{
    // veri gelme durumunda storu simule ediyoruz
    const store = mockStore({
        isLoading:false,
        error:null,
        data:exa_data,
    })


    render(<Provider store={store}>
        <BrowserRouter>
         <Detail/>
        </BrowserRouter>
       </Provider>)

        //1) ulke detaylari ekrana geliyor mu ?
            // ulke ismi ekrana geliyor mu 
            screen.getByText("Holland")

            // ekrandaki resmi al
        const image = screen.getByRole("img")
            // resmin kaynagi dogrumu kontrol et 
        expect(image).toHaveProperty("src" , exa_data.country.flags.png)

     //1) Card'lar ekrana geliyor mu ?
        //covid nesnesini diziye ceviriyoruz
      const arr =  Object.entries(exa_data.covid)
        //dizideki butun elemanlarin key ve value degerleri ekrana basiliyor mu kontrol et 
        arr.forEach((item) => {
            //baslik (key) ekrana geldimi 
            screen.getByText(item[0].split("_").join(" "))
            //deger(value) ekrana geldimi 
            screen.getAllByText(item[1])
        })

})
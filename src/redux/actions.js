import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const covidUrl = "https://covid-19-statistics.p.rapidapi.com/reports";

const headers = {
  "x-rapidapi-key": "2070e90c05msh6610476b82f11cep19d1d8jsn6c4791ddda4c",
  "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
};

const getData = createAsyncThunk("covid/getData", async ({ code, query }) => {
  // console.log("action tetiklendi :" ,code);
  console.log(query);

  //API'ye gonderilecek parametreleri hazirla
  const params = { iso: code, q: query };

  //iSOcode 'a gore covid verilerini al
  const res1 = await axios.get(covidUrl, { params, headers });
  //  console.log(res1);

  //isocode'a gore ulkenin verilerini al
  const res2 = await axios.get(
    code
      ? `https://restcountries.com/v3.1/alpha/${code}`
      : `https://restcountries.com/v3.1/name/${query}`
  );
  //    console.log(res2);

  //Promise.all() methodu ile : Her iki api istegini ayni anda paralel olarak atiyoruz. performans artisi sagliyor
  const responses = await Promise.all([res1, res2]);
  //    console.log(responses);

  //api'den gelen veriyi duzenledik :region nesnesindeki degerleri bir ust nesne ile ayni duzeye cikardik
  const covid = {
    ...responses[0].data.data[0],
    ...responses[0].data.data[0].region,
  };
  //    console.log(covid);

  //duzenlenen veride  gereksiz degerleri kaldirdik
  delete covid.cities;
  delete covid.region;
  //    console.log(covid);

  const country = responses[1].data[0];
  //    console.log(country);

  // duzenledigimiz verileri(payloadi) return ettık
  return { covid, country };
});

export default getData;

import { useEffect } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import getData from "../../redux/actions";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import InfoCard from "./InfoCard";

const Detail = () => {
  // store' a abone oluyoruz
  const { isLoading, error, data } = useSelector((store) => store);
  // console.log(data);
  //url'deki code parametresine erisme
  const [params] = useSearchParams();
  const code = params.get("code");
  const query = params.get("q");
  // console.log(code);

  const dispatch = useDispatch();

  useEffect(() => {
    // verileri alip store'a aktaran thunk aksiyonunu tetikler
    dispatch(getData({ code, query }));
  }, [code, query]);

  //Object.entries() methodu ile covid nesnesini diziye ceviriyoruz
  const covidArr = Object.entries(data?.covid || {});
  // console.log(covidArr);

  console.log(data);

  return (
    <div className="min-h-[calc(100vh-74px)]  grid place-items-center p-6">
      <div className="min-h-[80vh] bg-gray-300 p-8 rounded-lg shadow-lg max-w-3xl max-md:w-full">
        {/**ust icerik  */}
        <div className="flex justify-between items-center ">
          <Link
            to="/"
            className="bg-gray-700 text-white flex items-center gap-1 p-2 rounded-md text-lg hover:bg-gray-800"
          >
            {" "}
            <IoChevronBackOutline /> Geri
          </Link>

          <div className="flex items-center space-x-2">
            {isLoading ? (
              <Loader type="header" />
            ) : error ? (
              ""
            ) : (
              data && (
                <>
                  <img
                    className="rounded-md w-16 lg:w-24 "
                    src={data.country.flags.png}
                    alt={data.country.flags.alt}
                  />
                  <h1 className="text-lg lg:text-2xl font-bold">
                    {data.country.altSpellings[1]}
                  </h1>
                </>
              )
            )}
          </div>
        </div>

        {/**alt icerik  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-7">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Error
              info={error}
              retry={() => dispatch(getData({ code, query }))}
            />
          ) : (
            covidArr.map((item, key) => <InfoCard item={item} key={key} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
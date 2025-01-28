import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { productsAssets } from "../assets/assets";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { IoMdCard } from "react-icons/io";
import { LiaCartPlusSolid } from "react-icons/lia";
import Footer from "../components/Footer";

interface ProductProps {
  _id: string;
  name: string;
  price: string;
  description: string;
  image: string[];
}

export default function Product() {
  const { productId } = useParams();
  const [productData, setProductData] = useState<ProductProps | null>(null);
  const [image, setImage] = useState("");
  const [favorite, setFavorite] = useState(false);

  const fetchProductData = () => {
    const product = productsAssets.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, productsAssets]);

  return productData ? (
    <div>
      <Navbar />
      <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
        {/* Product Data */}
        <div className="flex gap-12 sm:gap-7 flex-col sm:flex-row">
          {/* Product Images */}
          <div className="flex-1 flex flex-col-reverse sm:flex-row">
            {/* flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal items-center sm:w-[10%] w-full */}
            <div className="flex sm:flex-col overflow-x-auto gap-y-2 justify-between sm:justify-normal items-center sm:w-[35%] w-full">
              {productData.image.map((item, index) => (
                <div
                  key={index}
                  className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 cursor-pointer bg-white p-2 rounded-md overflow-hidden"
                >
                  <img
                    onClick={() => setImage(item)}
                    src={item}
                    alt=""
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
            <div className="relative">
              <img
                className="w-[600px] h-[550px] bg-white object-contain p-2 rounded-md"
                src={image}
                alt=""
              />

              <button
                className="flex items-center justify-center absolute right-2 top-2 rounded-full border border-gray-400 p-2 w-fit"
                onClick={() => setFavorite(!favorite)}
              >
                {!favorite ? (
                  <FaRegHeart size={20} color="red" />
                ) : (
                  <FaHeart size={20} color="red" />
                )}
              </button>
            </div>
          </div>

          {/* Product Info */}

          <div className="flex-1 mr-4 text-white">
            {/* Product Info */}
            <div>
              <h1 className="font-normal text-3xl mb-2">
                {productData.description}
              </h1>
              <div className="mb-5">
                <div className="flex gap-2">
                  <p className="font-semibold text-sm">Marca:</p>
                  <span className="font-light text-sm">Gigabyte</span>
                </div>
              </div>
            </div>
            <div>
              <div className="border-t-[0.5px] border-[#535353] mb-3"></div>
              <div className="flex items-center justify-between">
                <div className="text-[#009E2A] font-medium text-sm">
                  PRODUTO DISPONIVEL
                </div>
                <div className="flex gap-2">
                  <p className="font-semibold text-sm">SKU:</p>
                  <span className="font-light text-sm">MCR-RX5700-STK</span>
                </div>
              </div>
              <div className="border-t-[0.5px] border-[#535353] mt-3"></div>
            </div>

            {/* Price */}
            <div>
              <div className="flex items-center gap-4 mt-10">
                <RiMoneyDollarBoxLine size={40} color="#009E2A" />
                <div className="flex flex-col gap-1">
                  <p className="text-[#009E2A] font-light text-xs">à vista</p>
                  <p className="text-[#009E2A] font-semibold text-3xl">
                    R$ {productData.price}
                  </p>
                  <p className="font-light text-xs">no PIX com 15% desconto</p>
                </div>
              </div>
              <div className="border border-[#ff1515] w-10 my-4"></div>
              <div className="flex items-center gap-4">
                <IoMdCard size={40} color="#ff1515" />
                <div className="flex flex-col gap-1">
                  <p className="text-[#ff1515] font-semibold text-3xl">
                    R$ {productData.price}
                  </p>
                  <p className="font-light text-sm">
                    em até <span className="text-[#ff1515]">12x</span> de{" "}
                    <span className="text-[#ff1515]">
                      R${productData.price}
                    </span>
                  </p>
                  <p className="font-light text-sm">sem juros no cartão</p>
                </div>
              </div>

              {/* Cart  */}
              <button className="flex items-center justify-center w-full h-20 rounded-md gap-2 bg-[#009E2A] hover:bg-[#006E1D] duration-300 my-10">
                <LiaCartPlusSolid size={55} />
                <div>
                  <p className="text-3xl font-bold">COMPRAR</p>
                  <p className="text-xs">COLOCAR NO CARRINHO</p>
                </div>
              </button>
              {/* <div className="border-t-[0.5px] border-[#535353] mb-10"></div> */}

              {/* Installment/Parcelamento */}
              {/* <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <IoMdCard size={30} color="#ff1515" />
                  <p className="text-[#ff1515] font-semibold text-xl">
                    PARCELAMENTO
                  </p>
                </div>
                <div className="flex justify-around p-1 rounded-md bg-[#535353] mb-20">
                  <div>
                    <p>1x de R$1.503,52 (com 10% de desconto)</p>
                    <p>2x de R$793,53 (com 5% de desconto)</p>
                    <p>3x de R$529,02 (com 5% de desconto)</p>
                    <p>4x de R$405,12 (com 3% de desconto)</p>
                    <p>5x de R$324,09 (com 3% de desconto)</p>
                    <p>6x de R$270,08 (com 3% de desconto)</p>
                  </div>
                  <div>
                    <p>7x de R$238,65 (sem juros)</p>
                    <p>8x de R$208,82 (sem juros)</p>
                    <p>9x de R$185,62 (sem juros)</p>
                    <p>10x de R$167,06 (sem juros)</p>
                    <p>11x de R$151,87 (sem juros)</p>
                    <p>12x de R$139,22 (sem juros)</p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* About */}

        <div className="flex flex-col justify-center gap-28 text-white my-20">
          <div className="text-white flex flex-col items-center gap-4">
            <div className="border border-[#ff1515] w-20 my-4"></div>
            <p className="text-xl">SOBRE</p>
          </div>
          <div className="flex gap-10 mx-10">
            <div className="flex-1 flex flex-col justify-center gap-4">
              <p className="text-2xl font-semibold">
                PLACA DE VÍDEO MANCER RX 5700 8GB
              </p>
              <p className="text-justify text-lg">
                Para te levar as suas maiores conquistas, a Mancer trouxe a
                Placa de Vídeo RX 5700! Desenvolvida com performance ímpar em
                diversos jogos e programas, a Mancer Radeon RX 5700 fortalecerá
                suas próximas batalhas.
              </p>
            </div>
            <div className="flex-1">
              <img
                className="w-[600px] h-[550px] bg-white object-contain p-2 rounded-md"
                src={image}
                alt=""
              />
            </div>
          </div>
        </div>

        {/* Addtional Infomation */}
        <div className="mb-44 mx-10 text-white">
          <div className="text-white flex flex-col items-center gap-4">
            <div className="border border-[#ff1515] w-24 my-4"></div>
            <p className="text-xl">INFORMAÇÕES ADICIONAIS</p>
          </div>

          <div>
            <div className="flex flex-col gap-2">
              <div className="flex ">
                <p className="flex-1 font-semibold">Marca:</p>
                <span className="flex-1 font-light">Mancer</span>
              </div>
              <div className="border-t-[0.5px] border-[#535353] mb-2"></div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex ">
                <p className="flex-1 font-semibold">Modelo:</p>
                <span className="flex-1 font-light">MCR-RX5700-STK</span>
              </div>
              <div className="border-t-[0.5px] border-[#535353] mb-2"></div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex ">
                <p className="flex-1 font-semibold">GPU:</p>
                <span className="flex-1 font-light">AMD Radeon RX 5700</span>
              </div>
              <div className="border-t-[0.5px] border-[#535353] mb-2"></div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex ">
                <p className="flex-1 font-semibold">Interface:</p>
                <span className="flex-1 font-light">PCI Express x 16 4.0</span>
              </div>
              <div className="border-t-[0.5px] border-[#535353] mb-2"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}

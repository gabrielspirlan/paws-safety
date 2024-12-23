"use client"
import { CardAnimal, CardAnimalSkeleton } from "@/components/animal/card-animal";
import { faPaw, faQuestion,  } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "@/components/ui/Icon";
import { Header } from "@/components/home/header";
import { Footer } from "@/components/home/footer";
import { CarouselBanner } from "@/components/home/carousel-banner";
import { useState, useEffect } from "react";
import { Animal } from "@/types/animal";
import { api } from '@/conection/api'
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/navigation";


export default function Home() {
  const [ongID, setOngID] = useState<string>();
  const [animaisBanco, setAnimaisBanco] = useState<Animal[]>([]);
  const skeleton = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const router = useRouter ();
  useEffect(() => {

    const conexao = sessionStorage.getItem("ongId")
    if (conexao) setOngID(conexao);

    api.get("/animais/disponiveis/?include=raca,imagens").then((response) => {
      setAnimaisBanco(response.data.slice(0,12));
    });
  }, []); 

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Header />
        <div className="p-6 flex flex-col items-center justify-center gap-6 overflow-x-hidden">
          <CarouselBanner />
          <div className="flex gap-6 w-screen flex-wrap justify-center">
            <Icon size={2} icon={faPaw} onClick={() => {router.push('/adocoes')}}/>
            <Icon size={2} icon={faCircleUser}  onClick={() => {router.push(ongID ? '/ong/home' : '/login')}}/>
            <Icon size={2} icon={faQuestion}  onClick={() => {router.push('/sobre')}}/>
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:w-5/6 2xl:grid-cols-4 max-w-screen mx-auto justify-items-center ">
            {animaisBanco.length === 0 && (
              
                skeleton.map((card) => (
                  <CardAnimalSkeleton key={card} />
                ))
            )}
            {animaisBanco.length > 1 &&
              animaisBanco.map((animalRender: Animal) => (
                <CardAnimal key={animalRender.id} animal={animalRender}></CardAnimal>
              ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

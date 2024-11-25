"use client"

import { CardAnimal, CardAnimalSkeleton } from "@/components/animal/card-animal";
import { Header } from "@/components/home/header";
import { Footer } from "@/components/home/footer";
import { CarouselBanner } from "@/components/home/carousel-banner";
import { useState, useEffect } from "react";
import { Animal } from "@/types/animal";
import { api } from '@/conection/api'
import { CheckBox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSadTear } from "@fortawesome/free-regular-svg-icons";

export default function Page() {
  const [animaisFiltrados, setAnimaisFiltrados] = useState<Animal[]>([]);
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [especie, setEspecie] = useState<string>();
  const [porte, setPorte] = useState<string>();
  const [sexo, setSexo] = useState<string>();

  const skeleton = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  useEffect(() => {
    api.get("/animais/disponiveis/?include=raca,imagens").then((response) => {
      setAnimais(response.data);
      setAnimaisFiltrados(response.data)
    });
  }, []);

  const handleSexoMasculino = async () => {
    if (sexo != "M") {
      setSexo("M")
      setFiltrados({ sexoAtual: "M", especieAtual: especie, porteAtual: porte })
    } else {
      setSexo("");
      setFiltrados({ sexoAtual: "", especieAtual: especie, porteAtual: porte })
    }
  }

  const handleSexoFeminino = () => {
    if (sexo != "F") {
      setSexo("F")
      setFiltrados({ sexoAtual: "F", especieAtual: especie, porteAtual: porte })
    } else {
      setSexo("");
      setFiltrados({ sexoAtual: "", especieAtual: especie, porteAtual: porte })
    }
  }

  const handlePortePequeno = () => {
    if (porte != "Pequeno") {
      setPorte("Pequeno")
      setFiltrados({ porteAtual: "Pequeno", sexoAtual: sexo, especieAtual: especie })
    } else {
      setPorte("");
      setFiltrados({porteAtual: "", sexoAtual: sexo, especieAtual: especie})
    }
  }

  const handlePorteMedio = () => {
    if (porte != "Médio") {
      setPorte("Médio")
      setFiltrados({ porteAtual: "Médio", sexoAtual: sexo, especieAtual: especie })
    } else {
      setPorte("");
      setFiltrados({porteAtual: "", sexoAtual: sexo, especieAtual: especie})
    }
  }

  const handlePorteGrande = async () => {
    if (porte != "Grande") {
      setPorte("Grande")
      setFiltrados({ porteAtual: "Grande", sexoAtual: sexo, especieAtual: especie })
    } else {
      setPorte("");
      setFiltrados({porteAtual: "", sexoAtual: sexo, especieAtual: especie})
    }
  }

  const handleEspecieGato = async () => {
    if (especie !== "Gato") {
      setEspecie("Gato")
      setFiltrados({ especieAtual: "Gato", sexoAtual: sexo, porteAtual: porte })
    } else {
      setEspecie("");
      setFiltrados({ especieAtual: "", sexoAtual: sexo, porteAtual: porte })
    }

  }

  const handleEspecieCachorro = async () => {
    if (especie != "Cachorro") {
      setEspecie("Cachorro")
      setFiltrados({ especieAtual: "Cachorro", sexoAtual: sexo, porteAtual: porte })
    } else {
      setEspecie("");
      setFiltrados({ especieAtual: "", sexoAtual: sexo, porteAtual: porte })
    }
  }

  const handleLimparFiltros = () => {
    setEspecie("")
    setSexo("")
    setPorte("")
    setFiltrados({ especieAtual: "" });
  }

  type typeFiltrados = {
    especieAtual?: string;
    porteAtual?: string;
    sexoAtual?: string;
  }
  const setFiltrados = ({ especieAtual, porteAtual, sexoAtual }: typeFiltrados) => {
    let filtrados = [...animais];

    if (especieAtual == "Gato") {
      filtrados = filtrados.filter(animal => animal.raca.especie_id == "6706d01f4893faa8e07ba537");
    } else if (especieAtual == "Cachorro") {
      filtrados = filtrados.filter(animal => animal.raca.especie_id == "6706d01b4893faa8e07ba536");
    }

    if (porteAtual === "Pequeno") {
      filtrados = filtrados.filter(animal => animal.porte == "Pequeno");
    } else if (porteAtual === "Médio") {
      filtrados = filtrados.filter(animal => animal.porte == "Médio");
    } else if (porteAtual === "Grande") {
      filtrados = filtrados.filter(animal => animal.porte == "Grande");
    }

    if (sexoAtual === "F") {
      filtrados = filtrados.filter(animal => animal.sexo == "F");
    } else if (sexoAtual === "M") {
      filtrados = filtrados.filter(animal => animal.sexo == "M");
    }

    setAnimaisFiltrados(filtrados);
  };



  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Header />
        <div className="p-6 flex flex-col items-center justify-center gap-6 overflow-x-hidden">
          <CarouselBanner />
          <h2 className="text-deep-blue font-semibold text-3xl text-center md:text-4xl">Animais disponíveis para adoção</h2>

          {/**FILTROS  */}
          <div className="text-lg font-semibold text-sand-1500 flex  flex-col gap-3 w-full p-2 sm:items-center sm:gap-8">
            <div className="flex sm:items-center flex-col gap-3 sm:gap-8 xl:flex-row xl:gap-20">
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-12 sm:items-center sm:justify-center w-full xl:gap-20">
                <div className="flex flex-col gap-1">
                  <p>Espécie</p>
                  <div className="flex flex-row gap-3">
                    <CheckBox option="Gatos" onClick={handleEspecieGato} checked={especie === "Gato" ? true : false} />
                    <CheckBox option="Cachorros" onClick={handleEspecieCachorro} checked={especie === "Cachorro" ? true : false} />
                  </div>
                </div>
                <div></div>

                <div className="flex flex-col gap-1">
                  <p>Sexo</p>
                  <div className="flex flex-row gap-3">
                    <CheckBox option="Macho" onClick={handleSexoMasculino} checked={sexo === "M" ? true : false} />
                    <CheckBox option="Fêmea" onClick={handleSexoFeminino} checked={sexo === "F" ? true : false} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1 w">
                <p>Porte</p>
                <div className="flex flex-row gap-3">
                  <CheckBox option="Pequeno" onClick={handlePortePequeno} checked={porte === "Pequeno" ? true : false} />
                  <CheckBox option="Médio" onClick={handlePorteMedio} checked={porte === "Médio" ? true : false} />
                  <CheckBox option="Grande" onClick={handlePorteGrande} checked={porte === "Grande" ? true : false} />
                </div>
              </div>
            </div>
            <div className="mt-5 flex justify-center w-full md:mt-2 md:mb-3">
              <Button size={1} label="Limpar Filtros" onClick={handleLimparFiltros} />
            </div>
          </div>
          {animaisFiltrados.length === 0 && animais.length > 0 && (
            <div className="flex items-center justify-center  bg-sand-300 p-6 rounded-2xl">

              <div className="flex flex-row items-center justify-center text-sand-1500 text-xl text-center font-semibold">
                <FontAwesomeIcon icon={faFaceSadTear} className="size-6 p-4" />
                <p>
                  Desculpe, não foi possível encontrar nenhum animal
                </p>
              </div>


            </div>
          )}

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:w-5/6 2xl:grid-cols-4 max-w-screen mx-auto justify-items-center ">
            {animais.length === 0 && (

              skeleton.map((card) => (
                <CardAnimalSkeleton key={card} />
              ))
            )}
            {animaisFiltrados.length > 1 &&
              animaisFiltrados.map((animalRender: Animal) => (
                <CardAnimal key={animalRender.id} animal={animalRender}></CardAnimal>
              ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

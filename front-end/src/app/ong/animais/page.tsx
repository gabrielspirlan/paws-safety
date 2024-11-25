"use client";

import { CardAnimalSkeleton } from "@/components/animal/card-animal";
import { Header } from "@/components/home/header";
import { Footer } from "@/components/home/footer";
import { useState, useEffect } from "react";
import { Animal } from "@/types/animal";
import { api } from "@/conection/api";
import { useRouter } from "next/navigation";
import { PageName } from "@/components/ui/PageName";
import { CardAnimalOng } from "@/components/animal/card-animal-ong";
import { CheckBox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSadTear } from "@fortawesome/free-regular-svg-icons";

export default function Home() {
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [animaisFiltrados, setAnimaisFiltrados] = useState<Animal[]>([]);
  const [sexo, setSexo] = useState<string>();
  const [especie, setEspecie] = useState<string>();
  const [porte, setPorte] = useState<string>();
  const [adotado, setAdotado] = useState<string>();
  const [nomeOng, setNomeOng] = useState<string>("")

  const skeleton = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const router = useRouter();

  useEffect(() => {
    const ongId = sessionStorage.getItem("ongId");
    const nome = sessionStorage.getItem("nomeOng");
    setNomeOng(nome || "")
    console.log(ongId)
    if (ongId) {
      api.get(`/animais/ong/${ongId}?include=raca,imagens`).then((response) => {
        if (response.data.length === 0) {
          alert("Nenhum animal encontrado para esta ONG.");
          router.push("/ong/home");
        } else {
          setAnimais(response.data);
          setAnimaisFiltrados(response.data);
        }
      }).catch((error) => {
        console.error("Erro ao buscar os animais:", error);
        alert("Ocorreu um erro ao buscar os animais.");
      });
    } else {
      alert("É necessário estar logado para acessar essa página");
      router.push("/login");
    }
  }, [router]);


  const handleSexoMasculino = async () => {
    if (sexo != "M") {
      setSexo("M")
      setFiltrados({ sexoAtual: "M", especieAtual: especie, porteAtual: porte, adotadoAtual: adotado })
    } else {
      setSexo("");
      setFiltrados({ sexoAtual: "", especieAtual: especie, porteAtual: porte, adotadoAtual: adotado })
    }
  }

  const handleSexoFeminino = () => {
    if (sexo != "F") {
      setSexo("F")
      setFiltrados({ sexoAtual: "F", especieAtual: especie, porteAtual: porte, adotadoAtual: adotado })
    } else {
      setSexo("");
      setFiltrados({ sexoAtual: "", especieAtual: especie, porteAtual: porte, adotadoAtual: adotado })
    }
  }

  const handlePortePequeno = () => {
    if (porte != "Pequeno") {
      setPorte("Pequeno")
      setFiltrados({ porteAtual: "Pequeno", sexoAtual: sexo, especieAtual: especie, adotadoAtual: adotado })
    } else {
      setPorte("");
      setFiltrados({ porteAtual: "", sexoAtual: sexo, especieAtual: especie, adotadoAtual: adotado })
    }
  }

  const handlePorteMedio = () => {
    if (porte != "Médio") {
      setPorte("Médio")
      setFiltrados({ porteAtual: "Médio", sexoAtual: sexo, especieAtual: especie, adotadoAtual: adotado })
    } else {
      setPorte("");
      setFiltrados({ porteAtual: "", sexoAtual: sexo, especieAtual: especie, adotadoAtual: adotado })
    }
  }

  const handlePorteGrande = async () => {
    if (porte != "Grande") {
      setPorte("Grande")
      setFiltrados({ porteAtual: "Grande", sexoAtual: sexo, especieAtual: especie, adotadoAtual: adotado })
    } else {
      setPorte("");
      setFiltrados({ porteAtual: "", sexoAtual: sexo, especieAtual: especie, adotadoAtual: adotado })
    }
  }

  const handleEspecieGato = async () => {
    console.log("Funcção para atualizar Gatos")
    if (especie !== "Gato") {
      console.log("Atualizou para GATO")
      setEspecie("Gato")
      console.log(especie)
      setFiltrados({ especieAtual: "Gato", sexoAtual: sexo, porteAtual: porte, adotadoAtual: adotado })
    } else {
      setEspecie("");
      setFiltrados({ especieAtual: "", sexoAtual: sexo, porteAtual: porte, adotadoAtual: adotado })
    }

  }

  const handleEspecieCachorro = async () => {
    if (especie != "Cachorro") {
      setEspecie("Cachorro")
      setFiltrados({ especieAtual: "Cachorro", sexoAtual: sexo, porteAtual: porte, adotadoAtual: adotado })
    } else {
      setEspecie("");
      setFiltrados({ especieAtual: "", sexoAtual: sexo, porteAtual: porte, adotadoAtual: adotado })
    }
  }

  const handleAdotado = async () => {
    if (adotado != "Adotados") {
      setAdotado("Adotados");
      setFiltrados({ especieAtual: "", sexoAtual: sexo, porteAtual: porte, adotadoAtual: "Adotados" })
    } else {
      setAdotado("");
      setFiltrados({ especieAtual: "", sexoAtual: sexo, porteAtual: porte, adotadoAtual: "" })
    }
  }

  const handleNaoAdotado = async () => {
    if (adotado != "Não adotado") {
      setAdotado("Não adotado");
      setFiltrados({ especieAtual: "", sexoAtual: sexo, porteAtual: porte, adotadoAtual: "Não adotado" })
    } else {
      setAdotado("");
      setFiltrados({ especieAtual: "", sexoAtual: sexo, porteAtual: porte, adotadoAtual: "" })
    }
  }


  const handleLimparFiltros = () => {
    setEspecie("")
    setSexo("")
    setPorte("")
    setAdotado("")
    setFiltrados({ especieAtual: "" });
  }

  type typeFiltrados = {
    especieAtual?: string;
    porteAtual?: string;
    sexoAtual?: string;
    adotadoAtual?: string;
  }
  const setFiltrados = ({ especieAtual, porteAtual, sexoAtual, adotadoAtual }: typeFiltrados) => {
    let filtrados = [...animais];
    console.log(especie)

    if (especieAtual == "Gato") {
      filtrados = filtrados.filter(animal => animal.raca.especie_id == "6706d01f4893faa8e07ba537");
      console.log("Filtrou pelos Gatos")
    } else if (especieAtual == "Cachorro") {
      filtrados = filtrados.filter(animal => animal.raca.especie_id == "6706d01b4893faa8e07ba536");
      console.log("Filtrou pelos Cachorros")
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

    if (adotadoAtual == "Adotados") {
      filtrados = filtrados.filter(animal => animal.adotado == true);
    } else if (adotadoAtual == "Não adotado") {
      filtrados = filtrados.filter(animal => animal.adotado == false);
    }

    setAnimaisFiltrados(filtrados);
  };


  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Header />
        <PageName label={`Seus animais disponíveis, ${nomeOng}`} />
        {/**FILTROS  */}
        <div className="text-lg font-semibold text-sand-1500 flex  flex-col gap-3 w-full p-8 sm:items-center sm:gap-8">
          <div className="flex sm:items-center flex-col gap-3 sm:gap-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-12 sm:items-center sm:justify-center w-full xl:gap-20">
              <div className="flex flex-col gap-1">
                <p>Adoção</p>
                <div className="flex flex-row gap-3">
                  <CheckBox option="Adotados" onClick={handleAdotado} checked={adotado === "Adotados" ? true : false} />
                  <CheckBox option="Disponíveis" onClick={handleNaoAdotado} checked={adotado === "Não adotado" ? true : false} />
                </div>
              </div>
              <div></div>
              <div className="flex flex-col gap-1">
                <p>Espécie</p>
                <div className="flex flex-row gap-3">
                  <CheckBox option="Gatos" onClick={handleEspecieGato} checked={especie === "Gato" ? true : false} />
                  <CheckBox option="Cachorros" onClick={handleEspecieCachorro} checked={especie === "Cachorro" ? true : false} />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-12 sm:items-center sm:justify-center w-full xl:gap-20">
              <div className="flex flex-col gap-1 w">
                <p>Porte</p>
                <div className="flex flex-row gap-3">
                  <CheckBox option="Pequeno" onClick={handlePortePequeno} checked={porte === "Pequeno" ? true : false} />
                  <CheckBox option="Médio" onClick={handlePorteMedio} checked={porte === "Médio" ? true : false} />
                  <CheckBox option="Grande" onClick={handlePorteGrande} checked={porte === "Grande" ? true : false} />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p>Sexo</p>
                <div className="flex flex-row gap-3">
                  <CheckBox option="Macho" onClick={handleSexoMasculino} checked={sexo === "M" ? true : false} />
                  <CheckBox option="Fêmea" onClick={handleSexoFeminino} checked={sexo === "F" ? true : false} />
                </div>
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
        <div className="p-6 flex flex-col items-center justify-center gap-6 overflow-x-hidden">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:w-5/6 2xl:grid-cols-4 max-w-screen mx-auto justify-items-center">
            {animais.length === 0 &&
              skeleton.map((card) => <CardAnimalSkeleton key={card} />)}
            {animaisFiltrados.length > 0 &&
              animaisFiltrados.map((animalRender) => (
                <CardAnimalOng key={animalRender.id} animal={animalRender}></CardAnimalOng>
              ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

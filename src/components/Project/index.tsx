import {
  Project as ProjectWrapper,
  ProjectStack,
  ProjectStackTech,
  ProjectLink,
  ProjectLinks,
} from "./style";

import { Text } from "@/styles/Text";
import { useEffect, useState } from "react";
import { FaGithub, FaShare } from "react-icons/fa";
import { userData } from "@/utils/userData";

interface ReposType {
  id: number;
  name: string;
  language: string;
  description: string;
  git_url: string;
  homepage: string;
}


const projetos = [

  {
    name:"HamburgerKenzie",
    language: "JavaScript",
    description: "Hamburgueria",
    git_url:"https://github.com/jamilylima/Hamburger-kenzie",
    homepage:"https://react-entrega-s1-hamburgueria-da-kenzie-jamilylima.vercel.app/",

  },
  {
    name:"NuKenzie",
    language: "JavaScript",
    description: "Financial management",
    git_url:"https://github.com/jamilylima/NuKenzie",
    homepage:"https://react-entrega-s1-nu-kenzie-jamilylima.vercel.app/",

  },
  {
    name:"KenzieHub",
    language: "JavaScript",
    description: "Hamburgueria",
    git_url:"https://github.com/jamilylima/kenziehub",
    homepage:"https://react-entrega-s1-hamburgueria-da-kenzie-jamilylima.vercel.app/",

  },
  {
  name:"Form in react",
  language: "JavaScript",
  description: "registration form in react/ Validation with yup",
  git_url: "https://github.com/jamilylima/registration-form-",
  homepage:" https://react-entrega-s2-formulario-de-cadastro-jamilylima.vercel.app/",
  },
  {
    name:"kenzieShop",
    language: "JavaScript",
    description: "redux",
    git_url: "https://github.com/jamilylima/kenzieshop",
    homepage:" https://react-entrega-s3-kenzieshop-jamilylima.vercel.app/",

  },

]

export const Project = (): JSX.Element => {
  const [repositories, setRepositories] = useState<ReposType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data: Response = await fetch(
        `https://api.github.com/users/${userData.githubUser}/repos`
      )

      const json = await data.json();

      setRepositories(json);

      if (!data.ok) {
        throw data;
      }

      return json;
    };
    fetchData();
  }, []);

  return (
    <>
      {projetos?.map((repository) => (
        <ProjectWrapper key={repository.id}>
          <Text
            as="h2"
            type="heading3"
            css={{ marginBottom: "$3" }}
            color="grey1"
          >
            {repository.name}
          </Text>

          {repository.language && (
            <ProjectStack>
              <Text type="body2">Linguagem:</Text>
              <ProjectStackTech>
                <Text color="brand1" type="body2">
                  {repository.language}
                </Text>
              </ProjectStackTech>
            </ProjectStack>
          )}

          <Text type="body1" color="grey2">
            {repository.description}
          </Text>
          <ProjectLinks>
            <ProjectLink target="_blank" href={repository.git_url}>
              <FaGithub /> Github Code
            </ProjectLink>
            {repository.homepage && (
              <ProjectLink target="_blank" href={repository.homepage}>
                <FaShare /> Aplicação
              </ProjectLink>
            )}
          </ProjectLinks>
        </ProjectWrapper>
      ))}
    </>
  );
};

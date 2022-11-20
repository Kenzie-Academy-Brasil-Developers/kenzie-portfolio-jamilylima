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
    name:"Tests-postgreSQL",
    language: "JavaScript",
    description: "",
    git_url:"https://github.com/jamilylima/Tests-postgreSQL",
  },
  {
    name:"CRUD",
    language: "TypeScript",
    description: "CRUD-TypeORM-PostgreSQL-",
    git_url:"https://github.com/jamilylima/CRUD-TypeORM-PostgreSQL-",
  },
  {
    name:"Book-Klub",
    language: "TypeScript",
    description: "Participação do projeto Book Klub. É uma plataform virtual de clubes de livros, onde leitores podem se cadastrar, criar seus próprios clubes e agendar sessões de discussão sobre a obra que estão lendo. Todos os usuários cadastrados podem criar e administrar seus próprios clubes, e outros usuários podem ingressar em clubes existentes.",
    git_url:"https://github.com/Book-Klub/book-klub",
  },
  {
    name:"from-kontent",
    language: "Python",
    description: "CRUD com Django e Django Rest Framework",
    git_url:"https://github.com/jamilylima/from-kontent",
  },
  {
    name:"School API",
    language: "Python",
    description: "Participação do projeto School API. Está API foi criada com a linguagem python e o framework DJANGO. API simula o funcionamento de uma escola, podendo ser inseridos dados como matérias, professores, turmas e alunos e com esses dados criar determinados exames para essas matérias.Exames os quais o professor poderá atribuir uma nota para cada aluno, nota esta que será atualizada no boletim final do aluno.",
    git_url:"https://github.com/ReinhardtMGMT/m5project",
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
        <ProjectWrapper>
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

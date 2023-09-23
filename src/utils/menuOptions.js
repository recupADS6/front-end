import { ref } from "vue";

export default [
  {
    label: "Tipo Vaga de Emprego",
    key: "jobType",
    children:
    [
      {
        label: "Jovem Aprendiz",
        key: "jovem-aprendiz",
        value: "jovem-aprendiz",
        checkbox: ref(false),
      },
      {
        label: "Estágio",
        key: "estagio",
        value: "estagio",
        checkbox: ref(false),
      },
      {
        label: "Período Integral",
        key: "periodo-integral",
        value: "periodo-integral",
        checkbox: ref(false),
      },
      {
        label: "Contrato",
        key: "contrato",
        value: "contrato",
        checkbox: ref(false),
      },
    ]
  },
  {
  label: "Categoria",
  key: "category",
  children:
    [
      {
        label: "Desenvolvimento de Software",
        key: "desenvolvimento-de-software",
        value: "desenvolvimento-de-software",
        checkbox: ref(false),
      },
      {
        label: "Ciencias Dados",
        key: "cientista-de-dados",
        value: "cientista-de-dados",
        checkbox: ref(false),
      },
      {
        label: "Educação",
        key: "educacao",
        value: "educacao",
        checkbox: ref(false),
      },
      {
        label: "Engenharia",
        key: "engenharia",
        value: "engenharia",
        checkbox: ref(false),
      },
    ]
  },
  {
    label: "Nível de Escolaridade",
    key: "scholarShipLevel",
    children:
    [
      {
        label: "Graduação",
        key: "graduacao",
        value: "graduacao",
        checkbox: ref(false),
      },
      {
        label: "Pós-graduação",
        key: "posGraduacao",
        value: "posGraduacao",
        checkbox: ref(false),
      },
      {
        label: "Mestrado",
        key: "mestrado",
        value: "mestrado",
        checkbox: ref(false),
      },
      {
        label: "Doutorado",
        key: "doutorado",
        value: "doutorado",
        checkbox: ref(false),
      },
    ]
  }
];
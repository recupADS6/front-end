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
        value: "Jovem Aprendiz",
        checkbox: ref(false),
      },
      {
        label: "Estágio",
        key: "estagio",
        value: "Estágio",
        checkbox: ref(false),
      },
      {
        label: "Período Integral",
        key: "periodo-integral",
        value: "Período Integral",
        checkbox: ref(false),
      },
      {
        label: "Contrato",
        key: "contrato",
        value: "Contrato",
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
        value: "Desenvolvimento de Software",
        checkbox: ref(false),
      },
      {
        label: "Ciencias Dados",
        key: "cientista-de-dados",
        value: "Ciencias Dados",
        checkbox: ref(false),
      },
      {
        label: "Educação",
        key: "educacao",
        value: "Educação",
        checkbox: ref(false),
      },
      {
        label: "Engenharia",
        key: "engenharia",
        value: "Engenharia",
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
        value: "Graduação",
        checkbox: ref(false),
      },
      {
        label: "Pós-graduação",
        key: "posGraduacao",
        value: "Pós-graduação",
        checkbox: ref(false),
      },
      {
        label: "Mestrado",
        key: "mestrado",
        value: "Mestrado",
        checkbox: ref(false),
      },
      {
        label: "Doutorado",
        key: "doutorado",
        value: "Doutorado",
        checkbox: ref(false),
      },
    ]
  }
];
type MonthTranslateProps = {
  enUS: string
  ptBR: string
}

export enum Month {
  Jan = 0,
  Feb = 1,
  Mar = 2,
  Apr = 3,
  May = 4,
  Jun = 5,
  Jul = 6,
  Ago = 7,
  Sep = 8,
  Oct = 9,
  Nov = 10,
  Dec = 11
}

export const MonthTranslations: MonthTranslateProps[] = [
  { enUS: 'Jan', ptBR: 'Jan' },
  { enUS: 'Feb', ptBR: 'Fev' },
  { enUS: 'Mar', ptBR: 'Mar' },
  { enUS: 'Apr', ptBR: 'Abr' },
  { enUS: 'May', ptBR: 'Mai' },
  { enUS: 'Jun', ptBR: 'Jun' },
  { enUS: 'Jul', ptBR: 'Jul' },
  { enUS: 'Aug', ptBR: 'Ago' },
  { enUS: 'Sep', ptBR: 'Set' },
  { enUS: 'Oct', ptBR: 'Out' },
  { enUS: 'Nov', ptBR: 'Nov' },
  { enUS: 'Dec', ptBR: 'Dez' }
]

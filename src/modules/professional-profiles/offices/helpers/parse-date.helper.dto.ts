const englishFormat = /\b(?:Jan(?:uary|uar)?|Feb(?:ruary|ruar)?|M(?:a|ä)?r(?:ch|z)?|Apr(?:il)?|Ma(?:y|i)?|Jun(?:e|i)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|O(?:c|k)?t(?:ober)?|Nov(?:ember)?|De(?:c|z)(?:ember)?)\b (\d\d\d\d){1,4}/

export const handleConvertDurationToDate = async (duration: string) => {
  const date = duration.split(' · ')[0]?.trim()
  const initial = date?.split('-')[0]?.trim()?.replace(/\./g, '');
  const end = date?.split('-')[1]?.trim()?.replace(/\./g, '');
  if (englishFormat.test(initial) && englishFormat.test(end)){
    const initial_date = new Date(initial).toLocaleDateString()
    const end_date = new Date(end).toLocaleDateString()
    return {
      initial_date: initial_date.substring(3),
      end_date: end_date.substring(3)
    }  
  }
  
}
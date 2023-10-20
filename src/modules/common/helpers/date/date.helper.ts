import { Month, MonthTranslations } from './constants';

export const createLocaleOrUTCDate = (
  day: number,
  month: Month,
  year: number,
  utc?: boolean
): Date => {
  const date = utc
    ? new Date(Date.UTC(year, month, day))
    : new Date(year, month, day);
  return date;
};

export function isNumeric(value: string): boolean {
  return /^-?\d+$/.test(value);
}

export const createLocaleOrUTCTodayDate = (utc?: boolean): Date => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();
  const date = utc ? new Date(Date.UTC(year, month, day)) : new Date();
  return date;
};

export const isDateGreaterThan = (d1: Date, d2: Date): boolean => {
  if (d1)
    d1 = createLocaleOrUTCDate(
      d1.getDate(),
      d1.getMonth(),
      d1.getFullYear(),
      true
    );
  if (d2)
    d2 = createLocaleOrUTCDate(
      d2.getDate(),
      d2.getMonth(),
      d2.getFullYear(),
      true
    );
  if (d1 >= d2) {
    return true;
  } else if (d1 <= d2) {
    return false;
  } else {
    return false;
  }
};

export const convertLocaleDateStringToISOString = (
  localeDateString: string
): string => {
  if (!localeDateString) {
    return '';
  }
  const stringFormated = localeDateString.split('/').reverse().join('-');
  const date = new Date(stringFormated);
  return date.toISOString().split('T')[0];
};

export const convertLocaleDateStringToDate = (
  localeDateString: string
): Date => {
  if (!localeDateString) {
    return;
  }
  const stringFormated = localeDateString.split('/').reverse().join('-');
  const date = new Date(stringFormated);
  return date;
};

export const convertDateStringToLocaleDateString = (
  localeDateString: string
): string => {
  if (!localeDateString) {
    return;
  }
  const date = new Date(localeDateString);
  return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
};

export const convertLocaleDateStringToDateString = (
  dateString: string
): string => {
  if (!dateString) {
    return;
  }
  return dateString.split('/').reverse().join('-');
};
export const formatLocaleDateString = (string): string => {
  if (!string) return '';
  const date = new Date(string);
  let formated = date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  });
  formated =
    formated.slice(0, 6) + formated.charAt(6).toUpperCase() + formated.slice(7);
  return formated;
};

export const formatLocaleDateStringWithTime = (string): string => {
  if (!string) return '';
  const date = new Date(string);
  const stringFormated = date
    .toLocaleDateString()
    .split('/')
    .reverse()
    .join('-');
  const dateFormated = new Date(
    `${stringFormated}T${date.toLocaleTimeString()}`
  );
  let formated = dateFormated.toLocaleString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  formated =
    formated.slice(0, 6) + formated.charAt(6).toUpperCase() + formated.slice(7);
  return formated;
};

export const formatLocaleMonthYearString = (value: string): string => {
  if (!value || value === 'Invalid Date' || value === 'false') return '';

  if (value === 'Present' || value === 'Atualmente' || value === 'true')
    return 'Atualmente';

  if (isNumeric(value)) {
    return value;
  }

  const dateSplit = value?.split(' ');

  if (value?.includes('de')) {
    const dateInPort = MonthTranslations.find(
      (date) => date?.ptBR?.toLowerCase() === dateSplit[0]?.toLowerCase()
    );

    if (dateInPort) return `${dateInPort?.ptBR} de ${dateSplit[2]}`;
  }

  const dateInEnglish = MonthTranslations.find(
    (date) => date?.enUS?.toLowerCase() === dateSplit[0]?.toLowerCase()
  );

  if (dateInEnglish) return `${dateInEnglish?.ptBR} de ${dateSplit[1]}`;

  const stringFormated: string = value.split('/').reverse().join('-');
  const stringFormatedBreak: string[] = stringFormated.split('-');
  const date = new Date(
    `${stringFormatedBreak[0]}-${stringFormatedBreak[1]}-02`
  );

  if (isNaN(date.getDate())) return value;

  const formated = date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  let monthName = formated.replace(/.* de (.*). de .*/, '$1');
  monthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);
  const year = date.getFullYear();
  return `${monthName} de ${year}`;
};

export const formatLocaleDateWithTime = (string): string => {
  if (!string) return '';
  const date = new Date(string);
  const stringFormated = date
    .toLocaleDateString()
    .split('/')
    .reverse()
    .join('-');
  const dateFormated = new Date(
    `${stringFormated}T${date.toLocaleTimeString()}`
  );
  const formated = dateFormated.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  return formated;
};

export const getAge = (dateString: string): string => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  const todayDate = Number(today.toISOString().slice(8, 10));
  const birthDay = Number(birthDate.toISOString().slice(8, 10));
  if (m < 0 || (m === 0 && todayDate < birthDay)) {
    age--;
  }
  return age.toString() + ' anos';
};

const TimeUnits = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000
};

export const getFormattedTime = (date: string): string => {
  if (date) {
    const vacancyDate = new Date(date);
    const now = new Date();
    const relativeTime = new Intl.RelativeTimeFormat('pt-BR', {
      numeric: 'auto',
      style: 'short'
    });
    const elapsed = +vacancyDate - +now;
    for (const u in TimeUnits) {
      if (Math.abs(elapsed) > TimeUnits[u] || u === 'second') {
        return relativeTime.format(
          Math.round(elapsed / TimeUnits[u]),
          u as any
        );
      }
    }
  }
  return null;
};

export class DateHelper {
  public static toLocaleDateString(date: Date): string {
    const dateSplit = String(date).split('-');
    return `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]}`;
  }

  public static diff(date1: Date, date2: Date): number {
    const timeDiff = Math.abs(
      new Date(date2).getTime() - new Date(date1).getTime()
    );
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return diffDays;
  }

  public static padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  public static formatDate(date: Date | string | number) {
    const dateFormatted = new Date(
      [
        new Date(date).getFullYear(),
        this.padTo2Digits(new Date(date).getMonth() + 1),
        this.padTo2Digits(new Date(date).getDate())
      ].join('-')
    );

    return dateFormatted;
  }
}

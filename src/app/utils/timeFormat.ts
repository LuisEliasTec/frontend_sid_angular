export class TimeFormat {

  getTime(date: any) {
    let minutes = '' + new Date(date).getMinutes();
    if (new Date(date).getMinutes() < 10) {
      minutes = '0' + new Date(date).getMinutes();
    } else if (new Date(date).getMinutes() === 0) {
      minutes = '' + new Date(date).getMinutes() + '0';
    }
    return '' +
      new Date(date).getHours() +
      ':' + minutes;
  }

  getTimeAMPM(date: any) {
    let minutes = '' + new Date(date).getMinutes();
    let hours = '' + new Date(date).getHours();
    let hoursAux = new Date(date).getHours();
    let timeTurn = 'AM';
    if (new Date(date).getMinutes() < 10) {
      minutes = '0' + new Date(date).getMinutes();
    } else if (new Date(date).getMinutes() === 0) {
      minutes = '' + new Date(date).getMinutes() + '0';
    }
    if (hoursAux > 12) {
      hoursAux -= 12;
      timeTurn = 'PM';
    }
    if (hoursAux < 10) {
      hours = '0' + hoursAux;
    } else if (hoursAux === 0) {
      hours = '' + hoursAux + '0';
    } else if (hoursAux === 10 || hoursAux === 11) {
      hours = '' + hoursAux;
    }
    return '' + hours + ':' + minutes + ' ' + timeTurn;
  }

  setTimeHHMM(time: any) {
    const startSplit = time.split(':');
    return '' + startSplit[0] + ':' + startSplit[1];
  }

  setDate(date: Date, time: string) {
    const startSplit = time.split(':');
    date.setHours(parseInt(startSplit[0], 10));
    date.setMinutes(parseInt(startSplit[1], 10));
    return date;
  }

  setActualDate(time: string) {
    const startSplit = time.split(':');
    const date = new Date();
    date.setHours(parseInt(startSplit[0], 10));
    date.setMinutes(parseInt(startSplit[1], 10));
    return date;
  }

  getHoursInNumber(time: string) {
    const startSplit = time.split(':');
    const numberString = startSplit[0] + startSplit[1];
    return parseInt(numberString, 10);
  }

  getHours(time: string) {
    const startSplit = time.split(':');
    return parseInt(startSplit[0], 10);
  }

  getMinutes(time: string) {
    const startSplit = time.split(':');
    return parseInt(startSplit[1], 10);
  }

}

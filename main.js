moment.locale('pt-br');

window.addEventListener('load', function () {
  calcula();

  document.getElementById('dataHoraAcordar').addEventListener('change', function () {
    calcula();
  });
});


function calcula() {
	let horarioAcordar = '';

	valueInput = document.getElementById('dataHoraAcordar').value;

	if (valueInput.trim() == '') {
		horarioAcordar = moment().add(1, 'day').set('hour', 06).set('minute', 00);

		horainput = isoDateInDatetimeInput(horarioAcordar);
		document.getElementById('dataHoraAcordar').value = horainput;
	} else {
		horarioAcordar = moment(new Date(valueInput));
	}

	let possibilidadesDormir = [];

	for (let i = 1; i <= 16; i++) {
		possibilidadesDormir[i - 1] = moment(horarioAcordar).clone();
		possibilidadesDormir[i - 1].subtract((90 * i), 'minutes');

		if (possibilidadesDormir[i - 1].toDate() < moment().set('millisecond', possibilidadesDormir[i - 1].get('millisecond')).toDate()) {
			possibilidadesDormir[i - 1] = undefined;
		}
	}

	document.getElementById('divPossibilidadesDormir').innerHTML = '';

	for (var horario of possibilidadesDormir) {
		if (horario !== undefined) {
			document.getElementById('divPossibilidadesDormir').innerHTML += (horario.format('DD/MM HH:mm')) + '<br>';
		}
	}
}

function toStringPad2digits0(number) {
	return number.toString().padStart(2, 0);
}

function isoDateInDatetimeInput(date) {
	return `${date.year()}-${toStringPad2digits0(date.month() + 1)}-${toStringPad2digits0(date.date())}T${toStringPad2digits0(date.hours())}:${toStringPad2digits0(date.minutes())}`;
}
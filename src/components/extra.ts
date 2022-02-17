import WebSVG from '../assets/vina/web.svg';
import HorasMedPresSVG from '../assets/vina/horas-med-pres.svg';
import TelefonoSVG from '../assets/vina/telefono.svg';
import CamaraSVG from '../assets/vina/camara.svg';
import ServImagenesSVG from '../assets/vina/serv-imagenes.svg';
import PresupCirugiaSVG from '../assets/vina/presup-cirugia.svg';
import PrepExamSVG from '../assets/vina/prep-exam.svg';
import OtrasConsultasSVG from '../assets/vina/otras-consultas.svg';

export const initialMessage = [
  {
    _id: '0',
    contentType: 'TEXT',
    from: 'AGENT',
    content:
      'Hola, estoy aquí para ayudarte, elige alguna de las siguientes opciones:',
    icon: '',
    link: '',
  },
];

export const suggestionsObj = [
  {
    name: 'Agendar Horas Médicas Presenciales',
    icon: HorasMedPresSVG,
    options: [
      {
        text: 'Agenda de inmediato vía nuestro sitio web. Haz click aquí.',
        icon: WebSVG,
        link: 'https://agenda.hospitalclinico.cl/',
      },
      {
        text: 'Agenda vía Contact Center llamando al 3222323800 de lunes a viernes de 8:00 hrs. a 18:30 hrs. y sábados de 8:30 hrs. a 13:30 hrs. Haz click aquí para llamar.',
        icon: TelefonoSVG,
        link: 'tel:3222323800',
      },
    ],
  },
  {
    name: 'Agenda Horas Telemedicina',
    icon: CamaraSVG,
    options: [
      {
        text: 'Agenda de inmediato vía nuestro sitio web. Haz click aquí.',
        icon: WebSVG,
        link: 'https://app.tuotempo.com/mop/index.php?dbName=tt_hospital_clinico_vm&mopIframeReturnPage=https://www.hospitalclinico.cl/#search/query/%26 ',
      },
      {
        text: 'Agenda vía Contact Center llamando al 3222323800 de lunes a viernes de 8:00 hrs. a 18:30 hrs. y sábados de 8:30 hrs. a 13:30 hrs. Haz click aquí para llamar.',
        icon: TelefonoSVG,
        link: 'tel:3222323800',
      },
    ],
  },
  {
    name: 'Servicio de Imágenes',
    icon: ServImagenesSVG,
    options: [
      {
        text: 'Para agendar un servicio de exámen debes llamar a nuestro Contact Center al 3222323800 de lunes a viernes de 8:00 hrs. a 18:30 hrs. y sábados de 8:30 hrs. a 13:30 hrs. Haz click aquí para llamar.',
        icon: TelefonoSVG,
        link: 'tel:3222323800',
      },
    ],
  },
  {
    name: 'Preparación Exámenes',
    icon: PrepExamSVG,
    options: [
      {
        text: ' FALTA TEXTO Y LINK ',
        icon: WebSVG,
      },
      {
        text: 'Agenda vía Contact Center llamando al 3222323800 de lunes a viernes de 8:00 hrs. a 18:30 hrs. y sábados de 8:30 hrs. a 13:30 hrs. Haz click aquí para llamar.',
        icon: TelefonoSVG,
        link: 'tel:3222323800',
      },
    ],
  },
  {
    name: 'Presupuestos Cirugías',
    icon: PresupCirugiaSVG,
    options: [
      {
        text: 'Resuelve tus cirugías con nosotros, completa el siguiente formulario y nuestros ejecutivos tomaran contacto contigo. Haz click aquí.',
        icon: WebSVG,
        link: 'https://www.hospitalclinico.cl/budget',
      },
    ],
  },
  {
    name: 'Otras Consultas',
    icon: OtrasConsultasSVG,
    options: [
      {
        text: ' FALTA TITULO Y LINK AL FORMULARIO ',
        icon: WebSVG,
      },
      {
        text: 'Agenda vía Contact Center llamando al 3222323800 de lunes a viernes de 8:00 hrs. a 18:30 hrs. y sábados de 8:30 hrs. a 13:30 hrs. Click aquí para llamar.',
        icon: TelefonoSVG,
        link: 'tel:3222323800',
      },
    ],
  },
];

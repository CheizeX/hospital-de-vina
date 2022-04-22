import { ContentTypes, DERIVATIONS, MessageFrom } from './shared';

import WebSVG from '../assets/vina/web.svg';
import HorasMedPresSVG from '../assets/vina/horas-med-pres.svg';
import TelefonoSVG from '../assets/vina/telefono.svg';
import CamaraSVG from '../assets/vina/camara.svg';
import ServImagenesSVG from '../assets/vina/serv-imagenes.svg';
import PresupCirugiaSVG from '../assets/vina/presup-cirugia.svg';
import PrepExamSVG from '../assets/vina/prep-exam.svg';
import OtrasConsultasSVG from '../assets/vina/otras-consultas.svg';
import InfoSVG from '../assets/vina/info.svg';
import SignpostSVG from '../assets/vina/signpost.svg';
import MicrobeSVG from '../assets/vina/microbe.svg';
import DiagnosesSVG from '../assets/vina/diagnoses.svg';
import EmergencySVG from '../assets/vina/emergency.svg';
import AdmisionSVG from '../assets/vina/admision.svg';
import MedicalSVG from '../assets/vina/medical.svg';
import LabSVG from '../assets/vina/lab.svg';
import QuestionSVG from '../assets/vina/question.svg';
import Support from '../assets/vina/support-agente.svg';

export const initialMessage = [
  {
    contentType: ContentTypes.TEXT,
    from: MessageFrom.BOT,
    content: `¡Hola, estoy aquí para apoyarte en los servicios de HCVM!
      ¿En qué puedo ayudarte?`,
  },
];

export const suggestionsObjNew = [
  {
    name: 'Agendamiento hora presencial o telemedicina',
    icon: HorasMedPresSVG,
    subItems: [
      {
        name: 'Agendamiento presencial',
        icon: HorasMedPresSVG,
        options: [
          {
            text: 'Si usted desea agendar una consulta médica haga click aquí',
            icon: WebSVG,
            link: 'https://agenda.hospitalclinico.cl/',
          },
          {
            text: `Comunicarme con un Agente de servicio médico para agendar una hora presencial`,
            icon: Support,
            link: DERIVATIONS.AGENT,
          },
        ],
      },
      {
        name: 'Agendamiento Telemedicina',
        icon: CamaraSVG,
        options: [
          {
            text: 'Si usted desea agendar una consulta por telemedicina haga click aquí',
            icon: WebSVG,
            link: `https://app.tuotempo.com/mop/index.php?dbName=tt_hospital_clinico_vm&amp;mopIframeReturnPage=https://www.hospitalclinico.cl/#search/query/%26`,
          },
          {
            text: `Si desea hablar con nuestra ejecutiva de telemedicina, comuníquese al +56952393656, o haga click aquí para comunicarse por Whatsapp`,
            icon: '',
            link: ' https://wa.me/+56952393656',
          },
        ],
      },
      {
        name: 'Agendamiento exámenes',
        icon: ServImagenesSVG,
        options: [
          {
            text: `Comunicarme con un Agente de servicio médico para agendar un exámen`,
            icon: Support,
            link: DERIVATIONS.AGENT,
          },
        ],
      },
    ],
  },
  {
    name: `Preparación de exámenes`,
    icon: PrepExamSVG,
    options: [
      {
        text: `Comunicarme con un Agente de preparación de exámenes`,
        icon: Support,
        link: DERIVATIONS.AGENT,
      },
    ],
  },
  {
    name: `Presupuesto cirugía`,
    icon: PresupCirugiaSVG,
    options: [
      {
        text: 'Para realizar un presupuesto de su operación, haga click aquí',
        icon: WebSVG,
        link: 'https://www.hospitalclinico.cl/budget',
      },
      {
        text: `Si usted desea resolver dudas sobre su presupuesto llame al 322323951.`,
        icon: TelefonoSVG,
        link: '',
      },
    ],
  },
  {
    name: 'Informaciones',
    icon: InfoSVG,
    subItems: [
      {
        name: 'Dirección HCVM',
        icon: SignpostSVG,
        subItems: [
          {
            name: 'Centro de diagnóstico',
            icon: DiagnosesSVG,
            options: [
              {
                text: `El ingreso a Centro de Diagnóstico es por la calle Limache 1741 y se encuentra en el piso -1.`,
                icon: '',
                link: '',
              },
            ],
          },
          {
            name: 'Urgencia',
            icon: EmergencySVG,
            options: [
              {
                text: `El ingreso a Urgencia es por la calle Limache 1741. Allí encontrará una anfitriona que le indicará dónde debe dirigirse.`,
                icon: '',
                link: '',
              },
            ],
          },
          {
            name: 'Admisión',
            icon: AdmisionSVG,
            options: [
              {
                text: `El ingreso a Admisión es por la calle Limache 1741. Allí encontrará una anfitriona que le indicará dónde debe dirigirse.`,
                icon: '',
                link: '',
              },
            ],
          },
          {
            name: 'Centro Médico',
            icon: MedicalSVG,
            options: [
              {
                text: `El ingreso a Centro Médico es por la calle Llay Llay 1726. En la entrada del
                piso 1 encontrará a las ejecutivas de Centro Médico quienes le ayudarán con su consulta
                médica.`,
                icon: '',
                link: '',
              },
            ],
          },
          {
            name: 'Laboratorio',
            icon: LabSVG,
            options: [
              {
                text: `El ingreso a Centro Médico es por la calle Llay Llay 1726. Allí encontrará una anfitriona que le indicará dónde debe dirigirse.`,
                icon: '',
                link: '',
              },
            ],
          },
          {
            name: 'Poseo otra consulta en HCVM',
            icon: QuestionSVG,
            options: [
              {
                text: `Si usted posee otra consulta en la Clínica, debes ingresar por la calle Llay Llay 1726, allí encontrará una anfitriona que le indicará dónde debe dirigirse.`,
                icon: '',
                link: '',
              },
            ],
          },
        ],
      },
      {
        name: 'Dudas COVID',
        icon: MicrobeSVG,
        subItems: [
          {
            name: '¿Realizan PCR?',
            icon: HorasMedPresSVG,
            options: [
              {
                text: `Sólo realizamos PCR en el caso que sientas alguno de los síntomas
            provenientes de COVID-19 , en ese caso debe dirigirse a nuestro servicio de Urgencia donde le
            realizaremos la prueba.`,
                icon: '',
                link: ``,
              },
            ],
          },
          {
            name: '¿Qué hago si salí positivo en test de antígenos o PCR?',
            icon: HorasMedPresSVG,
            options: [
              {
                text: `En el caso de salir positivo en el test de antígenos o la prueba PCR, debe
                esperar al llamado del MINSAL o del consultorio más cercano a su domicilio, en caso de que no se
                contacten con usted, debe comunicarse con 'Salud Responde'al te:56003607777. Recuerde que no debe salir por
                ningún motivo de su domicilio. ¡Cuidarse es responsabilidad de todos!`,
                icon: '',
                link: ``,
              },
            ],
          },
          {
            name: 'Deseo agendar vacunarme con vacuna COVID-19',
            icon: HorasMedPresSVG,
            options: [
              {
                text: `Para agendar tu vacunación contra el COVID-19 debe llamar al 322323800,
                contactarse por whatsapp al +56975878298 o haciendo click aquí`,
                icon: '',
                link: `https://wa.me/+56975878298`,
              },
            ],
          },
        ],
      },
      {
        name: 'Otras dudas',
        icon: OtrasConsultasSVG,
        options: [
          {
            text: 'Para cualquier otra duda, por favor comuníquese con nuestras ejecutivas al',
            icon: TelefonoSVG,
            link: '',
          },
        ],
      },
    ],
  },
];

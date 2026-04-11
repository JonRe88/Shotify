import { Question } from '../types';

export const questions: Question[] = [
  // Generales / Divertidas (1-10)
  { id: 1, text: "¿Alguna vez te quedaste dormido en una fiesta?", category: "general" },
  { id: 2, text: "¿Te has ido de una cita sin avisar?", category: "general" },
  { id: 3, text: "¿Alguna vez has fingido estar enfermo para no ir al trabajo/escuela?", category: "general" },
  { id: 4, text: "¿Tienes alguna foto vergonzosa en tu celular?", category: "general" },
  { id: 5, text: "¿Alguna vez has mentido en un juego como este?", category: "general" },
  { id: 6, text: "¿Has stalkeado a tu ex en redes sociales?", category: "general" },
  { id: 7, text: "¿Te has hecho pasar por alguien más en internet?", category: "general" },
  { id: 8, text: "¿Alguna vez has usado una excusa absurda para no salir?", category: "general" },
  { id: 9, text: "¿Te has quedado sin dinero en una salida y alguien tuvo que pagarte todo?", category: "general" },
  { id: 10, text: "¿Has bailado ridículamente en público?", category: "general" },

  // Vergonzosas (11-20)
  { id: 11, text: "¿Alguna vez te han cachado cantando en el baño?", category: "vergonzosa" },
  { id: 12, text: "¿Has mandado un mensaje a la persona equivocada?", category: "vergonzosa" },
  { id: 13, text: "¿Alguna vez hablaste mal de alguien sin darte cuenta de que estaba cerca?", category: "vergonzosa" },
  { id: 14, text: "¿Te has caído en público?", category: "vergonzosa" },
  { id: 15, text: "¿Has olvidado el nombre de alguien justo después de que se presentó?", category: "vergonzosa" },
  { id: 16, text: "¿Alguna vez te has quedado sin papel en el baño?", category: "vergonzosa" },
  { id: 17, text: "¿Has usado la misma ropa interior más de un día?", category: "vergonzosa" },
  { id: 18, text: "¿Te has ido a dormir sin bañarte después de sudar mucho?", category: "vergonzosa" },
  { id: 19, text: "¿Has llorado viendo una película infantil?", category: "vergonzosa" },
  { id: 20, text: "¿Alguna vez has perdido un reto y no cumplido la penitencia?", category: "vergonzosa" },

  // Picantes (21-30)
  { id: 21, text: "¿Alguna vez has besado a más de una persona en la misma noche?", category: "picante" },
  { id: 22, text: "¿Has tenido un crush con un profesor(a) o jefe(a)?", category: "picante" },
  { id: 23, text: "¿Alguna vez has mandado una foto atrevida?", category: "picante" },
  { id: 24, text: "¿Has estado en una cita solo por interés?", category: "picante" },
  { id: 25, text: "¿Alguna vez has tenido una cita de app de ligue?", category: "picante" },
  { id: 26, text: "¿Has mentido sobre tu número de parejas?", category: "picante" },
  { id: 27, text: "¿Has tenido un sueño con alguien de esta reunión?", category: "picante" },
  { id: 28, text: "¿Te han rechazado un beso?", category: "picante" },
  { id: 29, text: "¿Has pensado en alguien más estando con tu pareja?", category: "picante" },
  { id: 30, text: "¿Alguna vez has sido infiel?", category: "picante" },

  // Yo Nunca (31-40)
  { id: 31, text: "Yo nunca me he quedado despierto toda la noche de fiesta", category: "yo_nunca" },
  { id: 32, text: "Yo nunca me he enamorado de alguien imposible", category: "yo_nunca" },
  { id: 33, text: "Yo nunca he usado una excusa para evitar una multa o regaño", category: "yo_nunca" },
  { id: 34, text: "Yo nunca he llorado por un ex", category: "yo_nunca" },
  { id: 35, text: "Yo nunca he hecho trampa en un examen", category: "yo_nunca" },
  { id: 36, text: "Yo nunca he perdido mi celular en una fiesta", category: "yo_nunca" },
  { id: 37, text: "Yo nunca he tenido una resaca horrible", category: "yo_nunca" },
  { id: 38, text: "Yo nunca he mandado un mensaje borracho", category: "yo_nunca" },
  { id: 39, text: "Yo nunca he comido la comida de otra persona sin permiso", category: "yo_nunca" },
  { id: 40, text: "Yo nunca he inventado un chisme", category: "yo_nunca" },

  // Extras (41-50)
  { id: 41, text: "Imitar el acento de alguien", category: "extra", isChallenge: true },
  { id: 42, text: "Mostrar tu historial de búsquedas", category: "extra", isChallenge: true },
  { id: 43, text: "Llamar a un contacto aleatorio", category: "extra", isChallenge: true },
  { id: 44, text: "Dejar que el grupo elija tu foto de perfil", category: "extra", isChallenge: true },
  { id: 45, text: "Cambiar tu estado de WhatsApp por lo que el grupo diga", category: "extra", isChallenge: true },
  { id: 46, text: "Decir en voz alta tu última conversación de WhatsApp", category: "extra", isChallenge: true },
  { id: 47, text: "Dejar que alguien revise tus fotos recientes", category: "extra", isChallenge: true },
  { id: 48, text: "Dejar que alguien te haga una pregunta directa", category: "extra", isChallenge: true },
  { id: 49, text: "Mandar un emoji al azar a tu crush", category: "extra", isChallenge: true },
  { id: 50, text: "Tomar un shot doble si nunca has besado en la primera cita", category: "extra", isChallenge: true }
];
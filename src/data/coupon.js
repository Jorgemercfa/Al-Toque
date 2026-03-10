import coupon1 from '@/assets/coupon1.png';
import coupon2 from '@/assets/coupon2.png';
import coupon3 from '@/assets/coupon3.png';
import coupon4 from '@/assets/coupon4.png';
import coupon5 from '@/assets/coupon5.png';
import coupon6 from '@/assets/coupon6.png';

export default [
  {
    id: 1,
    name: 'Cine Juan',
    shortDescription: '20% de descuento en entradas de cine los martes',
    longDescription:
      '20% todos los martes en entradas de cine en Cine Juan. Disfruta de tus películas favoritas con un descuento especial.',
    image: coupon1,
    percentage: '10%',
    expiration_date: '30/09/2026',
    Terms_of_use: 'valido solo martes no incluye ',
    coupon_code: 'CINEJUAN20',
    category: 'Entretenimiento',
    buy_button: 'COMPRAR',
    details_button: 'Entrar Aqui',
  },

  {
    id: 2,
    name: 'Pizza Express',
    shortDescription: '2x1 en pizzas familiares los viernes',
    longDescription:
      'Disfruta de una promoción especial 2x1 en pizzas familiares todos los viernes.',
    image: coupon2,
    percentage: '50%',
    expiration_date: '31/12/2026',
    Terms_of_use: 'Válido solo viernes.',
    coupon_code: 'PIZZA2X1',
    category: 'Restaurantes',
    buy_button: 'COMPRAR',
    details_button: 'Entrar Aqui',
  },

  {
    id: 3,
    name: 'Gym PowerFit',
    shortDescription: '30% de descuento en membresía mensual',
    longDescription:
      'Obtén un 30% de descuento en tu primera membresía mensual.',
    image: coupon3,
    percentage: '30%',
    expiration_date: '15/11/2026',
    Terms_of_use: 'Válido solo para nuevos clientes.',
    coupon_code: 'POWERFIT30',
    category: 'Fitness',
    buy_button: 'COMPRAR',
    details_button: 'Entrar Aqui',
  },

  {
    id: 4,
    name: 'TechZone',
    shortDescription: '15% de descuento en accesorios tecnológicos',
    longDescription:
      'Aprovecha descuentos en audífonos, cargadores y teclados.',
    image: coupon4,
    percentage: '15%',
    expiration_date: '20/10/2026',
    Terms_of_use: 'Válido en accesorios seleccionados.',
    coupon_code: 'TECH15',
    category: 'Tecnología',
    buy_button: 'COMPRAR',
    details_button: 'Entrar Aqui',
  },

  {
    id: 5,
    name: 'Spa Relax',
    shortDescription: '25% de descuento en masajes relajantes',
    longDescription: 'Relájate con un 25% de descuento en sesiones de masaje.',
    image: coupon5,
    percentage: '25%',
    expiration_date: '10/12/2026',
    Terms_of_use: 'Reserva previa obligatoria.',
    coupon_code: 'RELAX25',
    category: 'Salud y Bienestar',
    buy_button: 'COMPRAR',
    details_button: 'Entrar Aqui',
  },

  {
    id: 6,
    name: 'Moda Urbana',
    shortDescription: '20% de descuento en ropa seleccionada',
    longDescription:
      'Renueva tu estilo con un 20% de descuento en prendas seleccionadas.',
    image: coupon6,
    percentage: '20%',
    expiration_date: '05/11/2026',
    Terms_of_use: 'Válido en productos seleccionados.',
    coupon_code: 'MODA20',
    category: 'Moda',
    buy_button: 'COMPRAR',
    details_button: 'Entrar Aqui',
  },
];

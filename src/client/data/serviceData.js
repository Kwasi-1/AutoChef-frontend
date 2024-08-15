const serviceData = [
  {
    title: 'Automobile Resprays',
    description: 'Revitalize your car’s appearance with our top-quality respray services. Whether you’re looking to restore your car’s original color or want a complete color change, our skilled technicians use the finest automotive paints and precision techniques to deliver a flawless finish.',
    points: [
      { title: 'Full Body Resprays', text: 'Complete color changes for a fresh new look.' },
      { title: 'Panel Resprays', text: 'Perfect for repairing specific areas or panels.' },
      { title: 'Custom Paint Jobs', text: 'Unique designs and custom colors to make your car stand out.' },
    ],
    image: require('../assets/image4.png'), 
    icon: 'mdi:spray-bottle',
    path: 'auto-resprays',
  },
  {
    title: 'Car Detailing',
    description: 'Keep your car looking brand new with our comprehensive car detailing services. Our detailing packages include meticulous cleaning, both inside and out, to ensure your vehicle shines.',
    points: [
      { title: 'Exterior Detailing', text: 'Includes wash, wax, and polish for a gleaming finish.' },
      { title: 'Interior Detailing', text: 'Deep cleaning of seats, carpets, and upholstery.' },
      { title: 'Ceramic Coating', text: 'Provides long-lasting protection and a brilliant shine.' },
    ],
    image: require('../assets/DetailingBg.jpg'), 
    icon: 'codicon:sparkle-filled',
    path: 'car-detailing',
  },
  {
    title: 'Electrical Services',
    description: 'Ensure your vehicle’s electrical systems are in top condition with our expert electrical services. From diagnostics to repairs, our certified technicians handle everything from minor electrical issues to complex system malfunctions.',
    points: [
      { title: 'Battery Replacement', text: 'Reliable battery testing and replacement services.' },
      { title: 'Alternator and Starter Repairs', text: 'Essential for keeping your car’s electrical system functioning.' },
      { title: 'Electrical Diagnostics', text: 'Advanced tools to identify and fix electrical problems quickly' },
    ],
    image: require('../assets/electricalBg.jpg'),
    icon: 'uil:circuit',
    path: 'electrical-services',
  },
  {
    title: 'Paint Correction',
    description: 'Remove imperfections and restore your car’s paint with our advanced paint correction services. Our multi-stage correction process effectively eliminates swirls, scratches, and oxidation, bringing back your car’s original luster.',
    points: [
      { title: 'Scratch and Swirl Removal', text: ' Enhance your car’s appearance by removing unsightly marks.' },
      { title: 'Oxidation Removal', text: ' Revive dull and faded paint.' },
      { title: 'Gloss Enhancement', text: ' Achieve a mirror-like finish with our polishing techniques' },
    ],
    image: require('../assets/paint-correctionBg.jpg'),
    icon: 'fluent:paint-brush-sparkle-24-filled',
    path: 'paint-correction',
  },
  {
    title: 'Bodyworks',
    description: 'From minor dents to major collision repairs, our bodywork services ensure your car looks as good as new. Using state-of-the-art equipment and techniques, we handle all aspects of body repair with precision.',
    points: [
      { title: 'Dent Repair', text: ' Fixes for small dings and dents without repainting.' },
      { title: 'Collision Repair', text: ' Comprehensive repair services for major accidents.' },
      { title: 'Panel Replacement', text: ' Replacing damaged panels to restore structural integrity.' },
    ],
    image: require('../assets/bodyworksBg.jpg'), 
    icon: 'mdi:hammer-wrench',
    path: 'bodyworks',
  },
  {
    title: 'Auto Mechanic',
    description: 'Trust our skilled mechanics to keep your car running smoothly. From routine maintenance to major repairs, we offer a wide range of mechanical services to meet all your automotive needs.',
    points: [
      { title: 'Engine Repairs', text: ' Diagnosing and fixing engine issues to maintain performance.' },
      { title: 'Brake Services', text: ' Ensuring your brakes are in optimal condition for safety.' },
      { title: 'Routine Maintenance', text: ' Regular services like oil changes, tire rotations, and inspections.' },
    ],
    image: require('../assets/mechanicBg.jpg'), 
    icon: 'fluent:wrench-settings-24-filled',
    path: 'auto-mechanic',
  },
];

export default serviceData;

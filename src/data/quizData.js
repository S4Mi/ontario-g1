export const quizData = {
  categories: [
    {
      id: 'traffic-signs',
      name: 'Traffic Signs & Lights',
      description: 'Test your knowledge of road signs, traffic lights, and pavement markings',
      icon: '🛑',
      color: 'bg-red-500'
    },
    {
      id: 'road-rules',
      name: 'Road Rules & Regulations',
      description: 'Learn about speed limits, right of way, and traffic laws',
      icon: '📏',
      color: 'bg-blue-500'
    },
    {
      id: 'safe-driving',
      name: 'Safe Driving Practices',
      description: 'Master defensive driving techniques and safety procedures',
      icon: '🛡️',
      color: 'bg-green-500'
    },
    {
      id: 'licensing',
      name: 'Licensing & Restrictions',
      description: 'Understand the graduated licensing system and G1 restrictions',
      icon: '🚗',
      color: 'bg-purple-500'
    },
    {
      id: 'emergencies',
      name: 'Emergency Procedures',
      description: 'Know what to do in emergency situations and breakdowns',
      icon: '🚨',
      color: 'bg-orange-500'
    },
    {
      id: 'vehicle-maintenance',
      name: 'Vehicle Maintenance',
      description: 'Learn about vehicle safety checks and maintenance requirements',
      icon: '🔧',
      color: 'bg-indigo-500'
    }
  ],

  quizzes: {
    'traffic-signs': [
      {
        question: 'What does a red octagonal sign mean?',
        options: [
          'Yield to other traffic',
          'Come to a complete stop',
          'Speed limit ahead',
          'Construction zone'
        ],
        correct: 1,
        explanation: 'A red octagonal sign is a stop sign. You must come to a complete stop before proceeding.'
      },
      {
        question: 'What color are warning signs?',
        options: [
          'Red and white',
          'Yellow and black',
          'Blue and white',
          'Green and white'
        ],
        correct: 1,
        explanation: 'Warning signs are typically yellow with black symbols or text to alert drivers of potential hazards.'
      },
      {
        question: 'What does a flashing yellow traffic light mean?',
        options: [
          'Stop immediately',
          'Proceed with caution',
          'Speed up to clear the intersection',
          'Turn right only'
        ],
        correct: 1,
        explanation: 'A flashing yellow light means proceed with caution. Slow down and be prepared to stop if necessary.'
      },
      {
        question: 'What do white lines on the road separate?',
        options: [
          'Traffic going in opposite directions',
          'Traffic going in the same direction',
          'Emergency vehicle lanes',
          'Bicycle lanes'
        ],
        correct: 1,
        explanation: 'White lines separate traffic going in the same direction, while yellow lines separate traffic going in opposite directions.'
      },
      {
        question: 'What does a yield sign look like?',
        options: [
          'Red circle with white border',
          'Red triangle pointing downward',
          'Yellow diamond',
          'Blue rectangle'
        ],
        correct: 1,
        explanation: 'A yield sign is a red triangle pointing downward, indicating drivers should slow down and yield to other traffic.'
      }
    ],

    'road-rules': [
      {
        question: 'What is the speed limit in urban areas unless otherwise posted?',
        options: [
          '30 km/h',
          '50 km/h',
          '60 km/h',
          '80 km/h'
        ],
        correct: 1,
        explanation: 'The default speed limit in urban areas is 50 km/h unless otherwise posted.'
      },
      {
        question: 'How far must you stop from a school bus with flashing red lights?',
        options: [
          '5 metres',
          '10 metres',
          '20 metres',
          '30 metres'
        ],
        correct: 2,
        explanation: 'You must stop at least 20 metres from a school bus with flashing red lights and extended stop sign.'
      },
      {
        question: 'What is the maximum blood alcohol level for G1 and G2 drivers?',
        options: [
          '0.02%',
          '0.04%',
          '0.00%',
          '0.08%'
        ],
        correct: 2,
        explanation: 'G1 and G2 drivers must maintain a zero blood alcohol level (0.00%).'
      },
      {
        question: 'When must you signal before turning?',
        options: [
          'At least 10 metres before the turn',
          'At least 20 metres before the turn',
          'At least 30 metres before the turn',
          'Only when other vehicles are present'
        ],
        correct: 2,
        explanation: 'You must signal your intention to turn at least 30 metres before the turn.'
      },
      {
        question: 'What is the speed limit on most highways in Ontario?',
        options: [
          '80 km/h',
          '90 km/h',
          '100 km/h',
          '110 km/h'
        ],
        correct: 2,
        explanation: 'The speed limit on most highways in Ontario is 100 km/h.'
      }
    ],

    'safe-driving': [
      {
        question: 'What is the recommended following distance in good weather?',
        options: [
          '1 second',
          '2 seconds',
          '3 seconds',
          '4 seconds'
        ],
        correct: 2,
        explanation: 'Maintain at least a 3-second following distance in good weather conditions.'
      },
      {
        question: 'What should you do when approaching a railway crossing?',
        options: [
          'Speed up to cross quickly',
          'Stop only if a train is visible',
          'Slow down, look, and listen for trains',
          'Honk your horn to warn others'
        ],
        correct: 2,
        explanation: 'Always slow down, look, and listen for trains when approaching railway crossings.'
      },
      {
        question: 'What should you do if your vehicle starts to skid?',
        options: [
          'Brake hard to stop the skid',
          'Turn the steering wheel in the opposite direction',
          'Turn the steering wheel in the direction of the skid',
          'Accelerate to regain control'
        ],
        correct: 2,
        explanation: 'Turn the steering wheel in the direction of the skid to regain control of your vehicle.'
      },
      {
        question: 'When should you use your high beam headlights?',
        options: [
          'In all driving conditions',
          'Only on highways',
          'On rural roads when no other vehicles are approaching',
          'Never use high beams'
        ],
        correct: 2,
        explanation: 'Use high beam headlights on rural roads when no other vehicles are approaching, but dim them for oncoming traffic.'
      },
      {
        question: 'What is the first thing you should do if you\'re involved in a collision?',
        options: [
          'Move your vehicle off the road',
          'Check for injuries and call emergency services',
          'Exchange insurance information',
          'Take photos of the damage'
        ],
        correct: 1,
        explanation: 'First, check for injuries and call emergency services if needed. Then move vehicles if safe to do so.'
      }
    ],

    'licensing': [
      {
        question: 'What is the minimum age to get a G1 licence in Ontario?',
        options: [
          '14 years old',
          '15 years old',
          '16 years old',
          '17 years old'
        ],
        correct: 2,
        explanation: 'You must be at least 16 years old to apply for a G1 licence in Ontario.'
      },
      {
        question: 'What restrictions apply to G1 drivers?',
        options: [
          'No driving between midnight and 5 AM',
          'Must drive with a fully licensed driver with 4+ years experience',
          'Cannot drive on any highways',
          'Must display a "New Driver" sign'
        ],
        correct: 1,
        explanation: 'G1 drivers must be accompanied by a fully licensed driver who has at least 4 years of driving experience.'
      },
      {
        question: 'How long must you hold a G1 licence before applying for G2?',
        options: [
          '6 months',
          '8 months',
          '12 months',
          '18 months'
        ],
        correct: 2,
        explanation: 'You must hold a G1 licence for at least 12 months before you can apply for a G2 licence.'
      },
      {
        question: 'What is the graduated licensing system designed to do?',
        options: [
          'Reduce insurance costs',
          'Allow new drivers to gain experience safely',
          'Speed up the licensing process',
          'Increase government revenue'
        ],
        correct: 1,
        explanation: 'The graduated licensing system allows new drivers to gain driving experience in low-risk environments.'
      },
      {
        question: 'Can G1 drivers drive on 400-series highways?',
        options: [
          'Yes, during daylight hours only',
          'Yes, with a licensed driver',
          'No, never',
          'Only on weekends'
        ],
        correct: 2,
        explanation: 'G1 drivers cannot drive on 400-series highways or expressways under any circumstances.'
      }
    ],

    'emergencies': [
      {
        question: 'What should you do if your vehicle breaks down on the highway?',
        options: [
          'Stay in your vehicle and wait for help',
          'Pull off the road as far as possible and use hazard lights',
          'Walk to the nearest exit',
          'Try to fix the problem yourself'
        ],
        correct: 1,
        explanation: 'Pull off the road as far as possible, use hazard lights, and call for help if needed.'
      },
      {
        question: 'What should you do if you see an emergency vehicle with flashing lights?',
        options: [
          'Speed up to get out of the way',
          'Pull over to the right and stop',
          'Honk your horn to alert others',
          'Continue driving normally'
        ],
        correct: 1,
        explanation: 'Pull over to the right and stop when you see an emergency vehicle with flashing lights and sirens.'
      },
      {
        question: 'What is the first step in the emergency braking procedure?',
        options: [
          'Apply the brakes firmly',
          'Look in the direction you want to go',
          'Steer to avoid the obstacle',
          'Honk your horn'
        ],
        correct: 1,
        explanation: 'Look in the direction you want to go first, then apply the brakes firmly and steer to avoid obstacles.'
      },
      {
        question: 'What should you do if your accelerator pedal sticks?',
        options: [
          'Turn off the ignition immediately',
          'Shift to neutral and brake',
          'Pump the brakes rapidly',
          'Steer into a ditch'
        ],
        correct: 1,
        explanation: 'Shift to neutral and apply the brakes firmly if your accelerator pedal sticks. Do not turn off the ignition while driving.'
      },
      {
        question: 'What should you do if you encounter black ice?',
        options: [
          'Speed up to get through quickly',
          'Brake hard to stop',
          'Slow down gradually and avoid sudden movements',
          'Turn the steering wheel sharply'
        ],
        correct: 2,
        explanation: 'Slow down gradually and avoid sudden movements when driving on black ice. Do not brake or accelerate suddenly.'
      }
    ],

    'vehicle-maintenance': [
      {
        question: 'How often should you check your vehicle\'s oil level?',
        options: [
          'Every day',
          'Every week',
          'Every month',
          'Every 6 months'
        ],
        correct: 2,
        explanation: 'Check your vehicle\'s oil level at least once a month and before long trips.'
      },
      {
        question: 'What is the minimum tread depth for safe tires?',
        options: [
          '1.5 mm',
          '2.0 mm',
          '2.5 mm',
          '3.0 mm'
        ],
        correct: 1,
        explanation: 'The minimum safe tread depth for tires is 1.5 mm. Replace tires when they reach this level.'
      },
      {
        question: 'What should you check before starting a long trip?',
        options: [
          'Only fuel level',
          'Only tire pressure',
          'Fuel, oil, tires, lights, and windshield wipers',
          'Only windshield wipers'
        ],
        correct: 2,
        explanation: 'Before a long trip, check fuel, oil, tires, lights, windshield wipers, and other essential systems.'
      },
      {
        question: 'What does a red warning light on your dashboard usually indicate?',
        options: [
          'A minor issue that can wait',
          'A serious problem requiring immediate attention',
          'A reminder for routine maintenance',
          'A feature that is currently active'
        ],
        correct: 1,
        explanation: 'Red warning lights usually indicate a serious problem that requires immediate attention. Stop safely and check the issue.'
      },
      {
        question: 'How often should you replace your windshield wiper blades?',
        options: [
          'Every 6 months',
          'Every year',
          'Every 2 years',
          'Only when they stop working'
        ],
        correct: 1,
        explanation: 'Replace windshield wiper blades at least once a year or when they show signs of wear or poor performance.'
      }
    ]
  }
}

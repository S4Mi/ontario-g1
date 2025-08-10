export const handbookData = {
  sections: [
    {
      id: 'getting-licence',
      title: 'Getting Your Driver\'s Licence',
      content: [
        {
          subtitle: 'Requirements',
          text: 'To get your G1 licence, you must be at least 16 years old and pass a vision test and knowledge test about the rules of the road and traffic signs.'
        },
        {
          subtitle: 'Graduated Licensing System',
          text: 'Ontario uses a graduated licensing system with three levels: G1 (learner), G2 (probationary), and G (full licence).'
        },
        {
          subtitle: 'G1 Restrictions',
          text: 'With a G1 licence, you must drive with a fully licensed driver who has at least 4 years of driving experience, maintain a zero blood alcohol level, and not drive on 400-series highways or expressways.'
        }
      ]
    },
    {
      id: 'safe-driving',
      title: 'Safe and Responsible Driving',
      content: [
        {
          subtitle: 'Getting Ready to Drive',
          text: 'Before starting your vehicle, ensure all mirrors are properly adjusted, seat is in the correct position, and all passengers are wearing seatbelts.'
        },
        {
          subtitle: 'Driving Along',
          text: 'Maintain a safe following distance, stay within speed limits, and always be aware of your surroundings. Use your mirrors frequently and check blind spots before changing lanes.'
        },
        {
          subtitle: 'Sharing the Road',
          text: 'Be courteous to other drivers, cyclists, and pedestrians. Yield the right of way when required and use proper signals for all turns and lane changes.'
        },
        {
          subtitle: 'Intersections',
          text: 'Approach intersections with caution. Obey traffic signals and signs, and always look for pedestrians before proceeding.'
        },
        {
          subtitle: 'Stopping',
          text: 'Come to a complete stop at stop signs and red lights. Stop for school buses with flashing lights and stop signs extended.'
        },
        {
          subtitle: 'Changing Directions',
          text: 'Signal your intention to turn at least 30 metres before the turn. Check mirrors and blind spots before changing direction.'
        },
        {
          subtitle: 'Parking',
          text: 'Park only where it is legal and safe. Do not park within 3 metres of a fire hydrant or 6 metres of a crosswalk.'
        },
        {
          subtitle: 'Freeway Driving',
          text: 'When entering a freeway, accelerate to match the speed of traffic. Use acceleration lanes and merge safely. Maintain a safe following distance.'
        },
        {
          subtitle: 'Night and Bad Weather',
          text: 'Reduce speed in poor conditions. Use low beam headlights in fog and ensure your windshield wipers are working properly.'
        },
        {
          subtitle: 'Emergencies',
          text: 'If your vehicle breaks down, pull off the road as far as possible. Use hazard lights and call for help if needed.'
        }
      ]
    },
    {
      id: 'traffic-signs',
      title: 'Traffic Signs and Lights',
      content: [
        {
          subtitle: 'Regulatory Signs',
          text: 'Red and white signs give orders that must be obeyed. Examples include stop signs, yield signs, and speed limit signs.'
        },
        {
          subtitle: 'Warning Signs',
          text: 'Yellow diamond-shaped signs warn of potential hazards ahead, such as curves, intersections, or construction zones.'
        },
        {
          subtitle: 'Information Signs',
          text: 'Blue and green signs provide information about services, directions, and destinations.'
        },
        {
          subtitle: 'Traffic Lights',
          text: 'Red means stop, yellow means caution, and green means go. Always stop on red and yellow unless it is unsafe to do so.'
        },
        {
          subtitle: 'Pedestrian Signals',
          text: 'White walking figure means pedestrians can cross. Flashing hand means do not start crossing. Solid hand means do not cross.'
        },
        {
          subtitle: 'Pavement Markings',
          text: 'White lines separate traffic going in the same direction. Yellow lines separate traffic going in opposite directions. Broken lines can be crossed when safe.'
        }
      ]
    },
    {
      id: 'keeping-licence',
      title: 'Keeping Your Driver\'s Licence',
      content: [
        {
          subtitle: 'Demerit Points',
          text: 'Traffic violations result in demerit points. Accumulating too many points can lead to licence suspension or cancellation.'
        },
        {
          subtitle: 'Suspension Reasons',
          text: 'Your licence can be suspended for driving under the influence, accumulating too many demerit points, or medical conditions that affect driving ability.'
        },
        {
          subtitle: 'Reinstatement',
          text: 'To get your licence back after suspension, you may need to complete driver improvement courses or wait for a specific period.'
        }
      ]
    },
    {
      id: 'vehicle-maintenance',
      title: 'Your Vehicle',
      content: [
        {
          subtitle: 'Maintenance',
          text: 'Regular maintenance includes checking oil, tires, brakes, lights, and windshield wipers. Keep your vehicle in good working condition.'
        },
        {
          subtitle: 'Insurance and Registration',
          text: 'All vehicles must be insured and registered. Carry proof of insurance and registration in your vehicle at all times.'
        },
        {
          subtitle: 'Towing',
          text: 'If you need to tow a trailer, ensure it is properly attached and does not exceed your vehicle\'s towing capacity.'
        }
      ]
    },
    {
      id: 'road-test',
      title: 'The Level Two Road Test',
      content: [
        {
          subtitle: 'Test Requirements',
          text: 'The G2 road test evaluates your ability to drive safely in various traffic situations. You must demonstrate proper driving techniques and knowledge of traffic rules.'
        },
        {
          subtitle: 'Test Components',
          text: 'The test includes parallel parking, three-point turns, lane changes, and driving through intersections. You will also be tested on your ability to handle emergency situations.'
        },
        {
          subtitle: 'Passing Criteria',
          text: 'To pass, you must complete all required maneuvers safely and demonstrate good driving habits throughout the test.'
        }
      ]
    }
  ],
  
  // Quick reference for common traffic rules
  quickReference: {
    speedLimits: {
      'Urban areas': '50 km/h',
      'Rural areas': '80 km/h',
      'Highways': '100 km/h',
      '400-series highways': '100 km/h'
    },
    stoppingDistances: {
      'School buses': '20 metres',
      'Emergency vehicles': '150 metres',
      'Railway crossings': '15 metres'
    },
    bloodAlcohol: {
      'G1/G2 drivers': '0.00%',
      'Full licence drivers': '0.08%'
    }
  }
}

export const trafficSigns = [
  {
    name: 'Stop Sign',
    description: 'Octagonal red sign with white letters. Come to a complete stop.',
    image: '🛑',
    category: 'regulatory'
  },
  {
    name: 'Yield Sign',
    description: 'Red and white triangle pointing downward. Slow down and yield to other traffic.',
    image: '🔻',
    category: 'regulatory'
  },
  {
    name: 'Speed Limit',
    description: 'White rectangle with black numbers. Maximum speed allowed.',
    image: '📏',
    category: 'regulatory'
  },
  {
    name: 'School Zone',
    description: 'Yellow diamond with children symbol. Reduce speed and watch for children.',
    image: '👦',
    category: 'warning'
  },
  {
    name: 'Construction Zone',
    description: 'Orange diamond with construction symbol. Reduce speed and watch for workers.',
    image: '🚧',
    category: 'warning'
  },
  {
    name: 'Railway Crossing',
    description: 'Yellow circle with X symbol. Watch for trains and stop if necessary.',
    image: '🚂',
    category: 'warning'
  }
]

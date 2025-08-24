export const testimonialsData = [
  {
    type: "text",
    quote:
      "Tastes like a candy I used to enjoy as a kid, but it's a vitamin. It tastes amazing!",
    initials: "PD",
    name: "Priya D.",
    location: "San Francisco, CA",
    rating: 5,
    bgColor: "from-emerald-400 to-emerald-500",
    textColor: "text-white",
  },
  {
    type: "video",
    name: "Sierra S.",
    location: "San Jose, CA",
    avatar:
      "https://images.unsplash.com/photo-1494790108375-2616b612b786?w=400&h=300&fit=crop&crop=face",
    bgColor: "from-white to-gray-50",
  },
  {
    type: "text",
    quote:
      "Finally found a supplement that actually works and tastes great too!",
    initials: "MK",
    name: "Mike K.",
    location: "Austin, TX",
    rating: 5,
    bgColor: "from-blue-500 to-indigo-600",
    textColor: "text-white",
  },
  {
    type: "video",
    name: "Jessica L.",
    location: "New York, NY",
    avatar:
      "https://images.unsplash.com/photo-1494790108375-2616b612b786?w=400&h=300&fit=crop&crop=face",
    bgColor: "from-white to-gray-50",
  },
  {
    type: "text",
    quote: "Best decision I made for my health this year. Highly recommend!",
    initials: "RH",
    name: "Robert H.",
    location: "Chicago, IL",
    rating: 5,
    bgColor: "from-orange-500 to-red-500",
    textColor: "text-white",
  },
  {
    type: "video",
    name: "Amanda C.",
    location: "Miami, FL",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=300&fit=crop&crop=face",
    bgColor: "from-white to-gray-50",
  },
  {
    type: "text",
    quote:
      "My kids love these vitamins and so do I. Perfect for the whole family!",
    initials: "LW",
    name: "Lisa W.",
    location: "Seattle, WA",
    rating: 5,
    bgColor: "from-pink-500 to-rose-500",
    textColor: "text-white",
  },
  {
    type: "video",
    name: "David M.",
    location: "Denver, CO",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face",
    bgColor: "from-white to-gray-50",
  },
  // Generated Data Starts Here
  ...Array.from({ length: 92 }, (_, i) => {
    const firstNames = ["John", "Jane", "Alex", "Emily", "Chris", "Katie", "Michael", "Sarah", "David", "Laura", "James", "Linda", "Robert", "Patricia", "William", "Jennifer"];
    const lastInitials = ["S", "M", "K", "J", "P", "R", "T", "W", "L", "G", "B", "C", "D", "F"];
    const locations = ["Los Angeles, CA", "Houston, TX", "Phoenix, AZ", "Philadelphia, PA", "San Diego, CA", "Dallas, TX", "San Antonio, TX", "Detroit, MI", "Columbus, OH", "Boston, MA"];
    const quotes = [
      "An absolutely outstanding experience from start to finish. Highly recommended!",
      "The quality and service are second to none. I'm a customer for life.",
      "I was skeptical at first, but this exceeded all my expectations.",
      "A game-changer for my daily routine. I can't imagine going without it.",
      "If you're on the fence, just do it. You won't regret it.",
      "Incredible product and even better customer support.",
      "This is the best investment I've made in a long time.",
    ];
    const avatars = [
      "https://images.unsplash.com/photo-1531123414780-f74242c2b052?w=400&h=300&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400&h=300&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=300&fit=crop&crop=face",
    ];
    const colors = [
      { bgColor: "from-sky-500 to-blue-600", textColor: "text-white" },
      { bgColor: "from-purple-500 to-violet-600", textColor: "text-white" },
      { bgColor: "from-teal-400 to-cyan-500", textColor: "text-white" },
      { bgColor: "from-amber-400 to-orange-500", textColor: "text-white" },
      { bgColor: "from-lime-400 to-green-500", textColor: "text-white" },
    ];

    const firstName = firstNames[i % firstNames.length];
    const lastInitial = lastInitials[i % lastInitials.length];
    const name = `${firstName} ${lastInitial}.`;

    if (i % 2 === 0) {
      const color = colors[i % colors.length];
      return {
        type: "text",
        quote: quotes[i % quotes.length],
        initials: `${firstName[0]}${lastInitial}`,
        name,
        location: locations[i % locations.length],
        rating: 5,
        bgColor: color.bgColor,
        textColor: color.textColor,
      };
    } else {
      return {
        type: "video",
        name,
        location: locations[i % locations.length],
        avatar: avatars[i % avatars.length],
        bgColor: "from-white to-gray-50",
      };
    }
  }),
];
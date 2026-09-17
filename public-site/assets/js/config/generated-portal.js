(() => {
  "use strict";
  const config = {
  "schemaVersion": 1,
  "business": {
    "name": "Headlines",
    "tagline": "Professional barbering with live Booksy availability",
    "description": "Professional grooming services, clear choices, and convenient online scheduling in Roanoke, Virginia.",
    "logo": "/assets/images/headlines-logo.jpg",
    "domain": "headlines.denduluru.com",
    "phoneDisplay": "(540) 524-8809",
    "phoneHref": "+15405248809",
    "email": "prvtmix99@gmail.com",
    "addressLines": [
      "2501 Hollins Rd NE",
      "Roanoke, VA 24012"
    ],
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=2501+Hollins+Rd+NE+Roanoke+VA+24012",
    "facebookUrl": "https://www.facebook.com/HeadlinesHollins/",
    "booksyUrl": "https://booksy.com/en-us/94095_headlines_barber-shop_134579_roanoke",
    "booksyBusinessId": 94095,
    "timezone": "America/New_York",
    "slug": "headlines",
    "locale": "en-US",
    "currency": "USD",
    "country": "US"
  },
  "hours": [
    {
      "day": "Sunday",
      "closed": true
    },
    {
      "day": "Monday",
      "closed": true
    },
    {
      "day": "Tuesday",
      "closed": true
    },
    {
      "day": "Wednesday",
      "open": "10:00 AM",
      "close": "5:00 PM"
    },
    {
      "day": "Thursday",
      "open": "10:00 AM",
      "close": "5:00 PM"
    },
    {
      "day": "Friday",
      "open": "10:00 AM",
      "close": "5:00 PM"
    },
    {
      "day": "Saturday",
      "open": "10:00 AM",
      "close": "2:00 PM"
    }
  ],
  "staff": [
    {
      "id": "ryan-vandyke",
      "name": "Ryan VanDyke",
      "title": "Barber",
      "photo": "/assets/images/staff/ryan_photo.jpeg",
      "bio": "Ryan VanDyke is known throughout the Roanoke area for clean fades, detailed beard work, consistent results, and a laid-back customer experience.",
      "booksyStafferId": 113042,
      "defaultService": "haircut"
    }
  ],
  "services": [
    {
      "slug": "haircut",
      "name": "Haircut",
      "shortName": "Haircut",
      "description": "Haircut with edge up.",
      "serviceId": 634731,
      "variantId": 9396822,
      "durationMinutes": 45,
      "price": 50,
      "availabilityPath": "/availability/haircut",
      "displayName": "Haircut",
      "currency": "USD",
      "active": true,
      "sortOrder": 1
    },
    {
      "slug": "haircut-and-beard",
      "name": "Haircut & Beard",
      "shortName": "Haircut & Beard",
      "description": "Haircut with beard shaping, edging, and line work.",
      "serviceId": 574263,
      "variantId": 9396820,
      "durationMinutes": 45,
      "price": 60,
      "availabilityPath": "/availability/haircut-and-beard",
      "displayName": "Haircut & Beard",
      "currency": "USD",
      "active": true,
      "sortOrder": 2
    },
    {
      "slug": "kids-cut",
      "name": "Kid's cut, 16 and under",
      "shortName": "Kid's Cut",
      "description": "Detailed haircut for clients age 16 and under.",
      "serviceId": 3602928,
      "variantId": 9396824,
      "durationMinutes": 35,
      "price": 35,
      "availabilityPath": "/availability/kids-cut",
      "displayName": "Kid's Cut",
      "currency": "USD",
      "active": true,
      "sortOrder": 3
    },
    {
      "slug": "black-mask",
      "name": "Black mask with charcoal and eucalyptus oil",
      "shortName": "Black Mask",
      "description": "Charcoal and eucalyptus treatment that exfoliates the skin.",
      "serviceId": 623287,
      "variantId": 9396821,
      "durationMinutes": 20,
      "price": 25,
      "availabilityPath": "/availability/black-mask",
      "displayName": "Black Mask",
      "currency": "USD",
      "active": true,
      "sortOrder": 4
    }
  ],
  "reviews": [
    {
      "author": "Michael",
      "rating": 5,
      "text": "Ryan gives an amazing haircut, best in Roanoke that I have found. Great laid-back atmosphere, good conversation with the guys in the shop, and a great experience every visit. I would recommend Headlines 100%."
    },
    {
      "author": "Brandon",
      "rating": 5,
      "text": "Ryan has been cutting my hair for close to 10 years. Ryan is truly an artist at what Ryan does. The shop atmosphere is always great as well. You are going to get a great haircut and have a great time."
    },
    {
      "author": "Terri",
      "rating": 5,
      "text": "The haircut is always on point, and the atmosphere is welcoming and comfortable. The conversation is natural and enjoyable, and the team is great to be around. Highly recommend this place."
    }
  ],
  "gallery": {
    "directory": "/assets/images/headlines-work",
    "filePattern": "headlines_work_{number}.jpeg",
    "count": 12,
    "homepageImages": [
      1,
      2,
      3
    ]
  },
  "booking": {
    "availabilityApiBase": "https://57z7wwag50.execute-api.us-east-1.amazonaws.com",
    "lambdaRuntime": "nodejs22.x",
    "awsRegion": "us-east-1"
  },
  "theme": {
    "active": "headlines-dark",
    "variables": {
      "background": "#0b1014",
      "surface": "#171d24",
      "surfaceAlt": "#111820",
      "text": "#ffffff",
      "mutedText": "#aeb7c2",
      "primary": "#43acd5",
      "secondary": "#ff5d3a",
      "accent": "#f0b93f",
      "success": "#63c895",
      "border": "#34404b",
      "bodyFont": "Inter, system-ui, sans-serif",
      "headingFont": "Inter, system-ui, sans-serif",
      "contentWidth": "1120px",
      "borderRadius": "14px"
    }
  },
  "portalVersion": "1.0.0",
  "bookingProvider": {
    "type": "booksy",
    "businessId": 94095,
    "widgetId": 94095,
    "stafferId": 113042,
    "country": "us",
    "language": "en",
    "profileUrl": "https://booksy.com/en-us/94095_headlines_barber-shop_134579_roanoke",
    "availabilityApiBase": "https://57z7wwag50.execute-api.us-east-1.amazonaws.com",
    "instantExperienceBase": "https://booksy.com/en-us/instant-experiences/widget"
  },
  "brand": {
    "logo": "/assets/images/headlines-logo.jpg",
    "favicon": "/assets/images/favicon-32.png",
    "heroImage": "/assets/images/headlines-hero-ai.jpg",
    "theme": "headlines-dark",
    "colors": {
      "background": "#F4E9D3",
      "surface": "#FFFDF7",
      "ink": "#171714",
      "muted": "#6B5A48",
      "primary": "#487A35",
      "accent": "#8BCF45",
      "dark": "#171D24"
    }
  },
  "features": {
    "liveAvailability": true,
    "booksyWidget": true,
    "instantBooksyHandoff": true,
    "reviews": true,
    "gallery": true
  },
  "content": {}
};
  const active = config.services.filter(service => service.active !== false).sort((a,b) => (a.sortOrder||0)-(b.sortOrder||0));
  const bySlug = Object.freeze(Object.fromEntries(active.map(service => [service.slug, Object.freeze(service)])));
  window.BOOKSY_PORTAL_CONFIG = Object.freeze({ ...config, services: Object.freeze(active), servicesBySlug: bySlug, getService(slug) { return bySlug[slug] || null; } });
  document.dispatchEvent(new CustomEvent("booksy-portal-config-ready", { detail: window.BOOKSY_PORTAL_CONFIG }));
})();

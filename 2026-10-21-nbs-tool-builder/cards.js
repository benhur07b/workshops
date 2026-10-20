// The one list of cards. The card guide, the digital board, the printed cards and
// the results page are all built from it, so the paper and the screen always match.
//
// source: where the card comes from
//   "SCENE"  - SCENE's NbS tool (https://nbstool-beta.scenecoalition.org/interactive-map)
//   "Demo"   - the NbS Map Platform demo built by BNHR
//   "Plan"   - the draft user journey (platform-info.pdf), not yet in any tool
// img: file in img/cards/, or null for a card with words only

window.NBS = {
  sources: {
    SCENE: "SCENE's NbS tool",
    Demo: "NbS demo",
    Plan: "Our draft plan",
  },

  // The people a table builds for. Each table picks one, so its choices are about
  // someone's real work rather than "everything for everyone".
  // The board's limits, for the whole board rather than per step: a table may keep
  // this share of all the cards, so it can weigh one step more than another.
  // Priority dots come in two pools: card dots (kept cards and wishes) and data dots.
  rules: {
    keepShare: 0.75,
    cardDots: 15,
    dataDots: 10,
  },

  people: [
    { id: "ana", name: "Ana", role: "city planner in Borongan", story: "Ana works in the city planning office and is updating the city's climate and land use plans. Next month Ana has to tell the city council which barangays flood most and which nature-based solutions could help there.", needs: "Barangay-level answers, in plain words, that can be printed and brought to a meeting for recommendations.", tech: "Not a map specialist. Uses an office laptop and a phone." },
    { id: "jun", name: "Jun", role: "technical officer at DENR-CCS", story: "Jun is building the national picture of nature-based solutions so they can grow beyond the three pilot cities. Jun writes policy briefs and reports that need numbers and maps to back them up.", needs: "Where NbS projects are across the country, what hazards and ecosystems they address, and data that can be cited.", tech: "Comfortable with maps; sometimes uses QGIS." },
    { id: "liza", name: "Liza", role: "decision-maker that prioritizes budget allocation for projects", story: "Liza is the governor of a province in the Negros Island Region. She wants to see if they have NbS projects in the province and identify possible support they can provide to boost NbS implementation that addresses their target societal challenges.", needs: "Map of NbS projects and project summary.", tech: "Has a location, but with limited knowledge of NbS." },
    { id: "rosa", name: "Rosa", role: "NbS implementer from an NGO", story: "Rosa's organisation, a member of the NbS Support Network, implements NbS. Rosa wants the project on the national map, credited to the organisation, so partners and donors can find it.", needs: "A simple way to add a project and show its results.", tech: "Has a spreadsheet of sites and photos, but no map files." },
    { id: "paolo", name: "Paolo", role: "student researcher", story: "Paolo is writing a thesis on Nature-based Solutions for coastal cities and is looking for examples, data and maps to download.", needs: "To find data and examples quickly, and to know where they come from.", tech: "Learning QGIS. Has no account on the platform." },
  ],

  // The map information the tool may need. "holder" is our best guess at who has it;
  // tables correct it. "cards" are the ids of the cards that would use it.
  data: [
    { id: "D1", name: "Official flood and landslide hazard maps", text: "Which areas are prone to flooding and landslides, at barangay scale.", holder: "MGB (DENR); Project NOAH", cards: ["disaster-risk", "barangay-hazards", "recommended"] },
    { id: "D2", name: "Storm surge maps", text: "How far inland storm surges can reach along the coast.", holder: "PAGASA; Project NOAH", cards: ["barangay-hazards", "recommended"] },
    { id: "D3", name: "Typhoons, rainfall, temperature and climate projections", text: "Past typhoon tracks, rainfall and temperature, and how they may change.", holder: "PAGASA", cards: ["disaster-risk", "climate"] },
    { id: "D4", name: "Official boundaries of barangays, cities and provinces", text: "Boundaries with the official codes, so every map lines up.", holder: "PSA; NAMRIA", cards: ["barangay", "search", "administration"] },
    { id: "D5", name: "Population and households by barangay", text: "How many people and households live in each barangay.", holder: "PSA (census); LGUs (CBMS)", cards: ["population"] },
    { id: "D6", name: "Poverty, livelihoods and other social and economic data", text: "Jobs, income, schooling, water and toilets, and poverty by barangay or city.", holder: "PSA; LGUs (CBMS)", cards: ["population", "employment", "education", "economy", "housing", "other-things"] },
    { id: "D7", name: "Gender and vulnerable groups", text: "Data on women, children, older people, persons with disabilities and other groups.", holder: "PSA; LGUs (CBMS)", cards: ["other-things", "benefits-people"] },
    { id: "D8", name: "Land cover and land use plans", text: "What covers the land today, and what the city plans for it.", holder: "NAMRIA (land cover); LGUs (land use plans)", cards: ["landcover"] },
    { id: "D9", name: "Forests and mangroves, and how they changed", text: "Where forests and mangroves are, and where they were lost or regrew.", holder: "DENR-FMB; Global Mangrove Watch", cards: ["ecosystems", "deforestation", "threat-summary", "ecosystem-damage", "pathway"] },
    { id: "D10", name: "Rivers, coasts, wetlands, coral reefs and seagrass", text: "Water bodies and coastal ecosystems, which matter most in cities.", holder: "NAMRIA; DENR river basin office; BFAR; UP Marine Science Institute", cards: ["ecosystems", "recommended"] },
    { id: "D11", name: "Protected areas and key biodiversity areas", text: "Where nature is protected or especially important.", holder: "DENR-BMB", cards: ["administration", "kba"] },
    { id: "D12", name: "Wildlife and species records", text: "Which species, trees among them, have been seen where.", holder: "DENR-BMB; universities and research groups", cards: ["wildlife", "key-species", "endangered-trees"] },
    { id: "D13", name: "Ancestral domains and land tenure", text: "Ancestral domain titles and forest tenure areas, so plans respect who holds the land.", holder: "NCIP; DENR-FMB", cards: ["administration", "other-things", "benefits-people"] },
    { id: "D14", name: "Elevation and slope", text: "How high and steep the land is, in detail.", holder: "NAMRIA", cards: ["terrain"] },
    { id: "D15", name: "Soil", text: "Soil types and their condition.", holder: "DA Bureau of Soils and Water Management", cards: ["soil"] },
    { id: "D16", name: "Existing NbS projects", text: "Where NbS projects are, what they do, and their results.", holder: "NbS Support Network members; CRS; DENR", cards: ["nbs-projects", "recommended", "guides"] },
    { id: "D17", name: "Fires and burned areas", text: "Where and when land and forest burned.", holder: "DENR-FMB; Bureau of Fire Protection", cards: ["burned-area", "disaster-risk"] },
    { id: "D18", name: "NbS activities for the Philippines", text: "Which NbS activities fit which places, what they cost and what they bring.", holder: "DENR-FMB; FFP; NbS Support Network members", cards: ["activities", "recommended", "guides", "benefits-nature", "benefits-people", "benefits-climate"] },
  ],

  // The steps follow SCENE's NbS tool, with our recommended approaches beside its pathway.
  // A step's number and a card's number (2.6) come from their place in this list, so
  // they can't drift; the id is the card's lasting name, which boards and results use.
  steps: [
    {
      id: "place",
      title: "Choose a place",
      question: "How do you want to pick the place you are looking at?",
      cards: [
        { id: "barangay", title: "Click a barangay", text: "Click any barangay on the map to choose it.", more: "In the NbS demo you pick a pilot city and a barangay, or click one on the map. SCENE does not go down to barangays.", img: "nbs-barangay.webp", source: "Demo" },
        { id: "search", title: "Search for a place and see its boundary", text: "Type a province or city: the map takes you there and outlines it.", more: "SCENE finds provinces and cities, and shows the boundary as a guide for drawing your area. Our draft plan asks for searches down to the barangay.", img: "boundary.webp", source: "SCENE" },
        { id: "draw", title: "Draw your own area", text: "Click points on the map to outline the area you care about.", more: "Useful when your site does not follow a barangay or city boundary, such as a watershed or a stretch of coast.", img: "draw.webp", source: "SCENE" },
        { id: "upload", title: "Upload a map of your area", text: "Use a map file you already have of your site.", more: "For organisations that already mapped their project area, for example in QGIS or Google Earth. SCENE takes a zipped shapefile, KML or KMZ.", img: "upload.webp", source: "SCENE" },
        { id: "area-size", title: "Check the size of the area", text: "The tool tells you how big your area is before it looks into it.", more: "A quick check that you drew or uploaded what you meant to. Our Borongan area is 4,705 ha.", img: "area-size.webp", source: "SCENE" },
        { id: "map-tools", title: "Map tools: find where I am, zoom, help", text: "Zoom to where you are standing, zoom in and out, and get help.", more: "Finding where you are is handy on a phone during a site visit.", img: "map-tools.webp", source: "SCENE" },
        { id: "basemaps", title: "Change the background map", text: "Switch between a street map, a plain map or a satellite view.", more: "The satellite view helps people recognise their place.", img: "basemaps.webp", source: "SCENE" },
        { id: "layers", title: "Turn map information on and off", text: "Show land cover, mangroves, protected areas and more, grouped by theme.", more: "SCENE groups its map information into five themes: site, nature, climate, people and country permits (for Indonesia), and lists the year and source of each.", img: "layers-list.webp", source: "SCENE" },
        { id: "legend", title: "See the legend and export the area", text: "A legend for the map information that is on, and a button to save the area as a map file.", more: "SCENE's legend panel, with its Export area button.", img: "legend.webp", source: "SCENE" },
      ],
    },
    {
      id: "land-nature",
      title: "What's there: land and nature",
      question: "What do you need to know about the place's land and nature?",
      cards: [
        { id: "ecosystems", title: "Kinds of ecosystems", text: "How much of the area is forest, mangrove, peatland or something else.", more: "SCENE looks only at forest, mangrove and peatland. Cities also have rivers, coasts, wetlands and urban green spaces.", img: "ecosystems.webp", source: "SCENE" },
        { id: "administration", title: "Which city and province", text: "Where the area is, and whether it overlaps a protected area.", more: "SCENE uses world boundaries. Philippine maps use official barangay, city and province boundaries.", img: "administration.webp", source: "SCENE" },
        { id: "terrain", title: "How high and steep the land is", text: "The elevation and how much of the land is flat or steep.", more: "Steep and low-lying land shape which approaches can work.", img: "terrain.webp", source: "SCENE" },
        { id: "deforestation", title: "Forest lost, and where the risk is", text: "How much forest was lost in ten years, and how likely more loss is.", more: "SCENE ranks the risk against the rest of the country. For our Borongan area it reported 1,373 ha lost, \"an average of 23.74% per year\": a figure to check.", img: "deforestation.webp", source: "SCENE" },
        { id: "landcover", title: "What covers the land", text: "How much is crops, rice, shrubs, forest, water or settlements.", more: "SCENE's land cover comes from satellite images and has not been checked on the ground.", img: "landcover.webp", source: "SCENE" },
        { id: "disaster-risk", title: "Disaster risks", text: "The risk of drought, flood, fire, landslide and typhoon.", more: "SCENE uses a regional dataset: it rated our Borongan area \"no risk\" for drought, flood, fire and typhoon. Philippine hazard maps (MGB, PAGASA, Project NOAH) work at barangay level.", img: "disaster-risk.webp", source: "SCENE" },
        { id: "wildlife", title: "Wildlife that may live there", text: "How many kinds of amphibians, birds, mammals and reptiles may be found.", more: "From the IUCN Red List: where species may live, not where they were seen.", img: "wildlife.webp", source: "SCENE" },
        { id: "key-species", title: "Important species seen there", text: "Key species recorded in or near the area.", more: "SCENE had no records for Borongan; coverage varies across the region.", img: "key-species.webp", source: "SCENE" },
        { id: "conservation", title: "Importance for nature, water and carbon", text: "How the area ranks worldwide for biodiversity, water and carbon.", more: "A global ranking, meant as a broad guide rather than for local planning.", img: "conservation.webp", source: "SCENE" },
        { id: "forest-integrity", title: "How healthy the forest is", text: "Whether the forest is intact or broken up and under pressure.", more: "Based on the Forest Landscape Integrity Index.", img: "forest-integrity.webp", source: "SCENE" },
        { id: "kba", title: "Key biodiversity areas", text: "Whether the area overlaps a key biodiversity area, and by how much.", more: "For our Borongan area, SCENE found 110.9 ha of the Mount Yacgun–Mount Sohoton complex.", img: "kba.webp", source: "SCENE" },
        { id: "endangered-trees", title: "Endangered trees", text: "How many endangered tree species may grow there.", more: "A world model at about 4 km that leaves out mangroves but one. SCENE counted 11 species for our Borongan area.", img: "endangered-trees.webp", source: "SCENE" },
        { id: "nbs-projects", title: "All NbS projects in the country", text: "Every NbS project in the Philippines on one national map.", more: "Not in SCENE. In the NbS demo, each dot is a project. Organisations would send their projects in a simple spreadsheet, and FFP joins them into this one map.", img: "nbs-projects.webp", source: "Demo" },
      ],
    },
    {
      id: "people-climate",
      title: "What's there: people and climate",
      question: "What do you need to know about the place's people and climate?",
      cards: [
        { id: "population", title: "People, and how vulnerable they are", text: "How many people live there by sex and age, the households, and how vulnerable the area is.", more: "One SCENE section: people from a population grid, households for the whole region, and scores from 0 to 1 for physical, environmental, economic and social vulnerability. Philippine census data goes down to the barangay.", img: "population.webp", source: "SCENE" },
        { id: "employment", title: "Jobs", text: "How many people have work, and the main jobs and sectors.", more: "From PSA, but for the whole region (Eastern Visayas), not the city or barangay.", img: "employment.webp", source: "SCENE" },
        { id: "education", title: "Schooling", text: "How many people aged 15 and over can read and write.", more: "The literacy rate from PSA, for the whole region.", img: "education.webp", source: "SCENE" },
        { id: "economy", title: "Household income", text: "The average household income per month.", more: "From PSA, for the whole region.", img: "economy.webp", source: "SCENE" },
        { id: "housing", title: "Water and toilets", text: "Where households get drinking water, and what toilets they have.", more: "SCENE's Housing and human settlements section, from the 2020 census, for the whole region.", img: "housing.webp", source: "SCENE" },
        { id: "carbon", title: "Carbon stored", text: "How much carbon the area stores in trees, roots and soil.", more: "Important for carbon projects and climate reporting.", img: "carbon.webp", source: "SCENE" },
        { id: "soil", title: "Soil types", text: "The main kinds of soil in the area.", more: "Soil affects what can be planted and restored.", img: "soil.webp", source: "SCENE" },
        { id: "climate", title: "Rainfall and temperature", text: "Monthly rainfall and temperature through the year.", more: "SCENE shows long-term averages.", img: "climate-ledger.webp", source: "SCENE" },
        { id: "burned-area", title: "Past fires", text: "How much land burned each year over the last ten years.", more: "From a world map of burned areas. SCENE found none for our Borongan area.", img: "burned-area.webp", source: "SCENE" },
      ],
    },
    {
      id: "threats",
      title: "Threats",
      question: "What is putting the place at risk?",
      cards: [
        { id: "barangay-hazards", title: "Hazards in the barangay", text: "Flooding, landslides, storm surge and other hazards present in the barangay.", more: "Our draft plan calls this the threat presence. The NbS demo has no official hazard maps yet: it profiles each barangay from its low-lying land, steep slopes, waterways and people.", img: "nbs-profile.webp", source: "Demo" },
        { id: "threat-summary", title: "Damage to each ecosystem", text: "How much of each ecosystem is intact, damaged or lost.", more: "SCENE's threat profile summarises forest, mangrove and peatland.", img: "threat-summary.webp", source: "SCENE" },
        { id: "disturbance-map", title: "A map of the damage", text: "Where in the area the damage happened.", more: "Shows remaining, disturbed, lost and regrown forest.", img: "disturbance-map.webp", source: "SCENE" },
        { id: "ecosystem-damage", title: "Damage and its causes, ecosystem by ecosystem", text: "What remains, was disturbed, lost or regrew, and why.", more: "SCENE groups the causes as human, natural or unknown. For our Borongan area it could not identify them.", img: "ecosystem-damage.webp", source: "SCENE" },
        { id: "field-check", title: "A reminder to check on the ground", text: "Each result says where its data comes from and that it needs checking on site.", more: "SCENE adds a disclaimer and the data source under every result.", img: "field-verification.webp", source: "SCENE" },
      ],
    },
    {
      id: "nbs",
      title: "What NbS could work",
      question: "What should the tool suggest for the place? Should it start from the place's hazards (ours), its ecosystems (SCENE), or both?",
      cards: [
        { id: "recommended", title: "Recommended NbS approaches", text: "A ranked list of NbS approaches that suit the place, beside its key facts.", more: "Ours, not in SCENE. The NbS demo ranks ten approaches for a pilot barangay from its hazards and land, next to a short profile of the place. It starts from the hazards; SCENE starts from the ecosystems. The criteria behind the ranking are discussed this afternoon.", img: "nbs-recommended.webp", source: "Demo" },
        { id: "other-things", title: "Other things to consider", text: "Livelihoods, gender, biodiversity and monitoring.", more: "From our draft plan: things that matter for a good NbS but are not on a map.", img: null, source: "Plan" },
        { id: "guides", title: "Guides on each approach", text: "A page for each approach: what it is, where it fits, what it costs.", more: "The NbS demo has a factsheet for each of ten approaches, with filters by hazard and ecosystem.", img: "nbs-approaches.webp", source: "Demo" },
        { id: "no-answer", title: "Says where it has no answer", text: "Warns when part of the area, or an ecosystem, has no pathway or activity.", more: "For our Borongan area, SCENE warned that a quarter of the area carries no pathway, and that it has no activity for managing mangroves.", img: "pathway-notes.webp", source: "SCENE" },
        { id: "pathway", title: "Protect, manage or restore", text: "How many hectares of each ecosystem could be protected, managed or restored.", more: "SCENE's pathway step, for forest, mangrove and peatland. It explains each pathway, and you can choose more than one for an ecosystem.", img: "pathway.webp", source: "SCENE" },
        { id: "activities", title: "Choose activities", text: "Pick the activities for each pathway, such as assisted natural regeneration.", more: "SCENE lists nine activities for forest, such as agroforestry, riparian buffers and forest landscape restoration, and three for mangrove; none for managing mangroves. Many are close to our recommended approaches.", img: "activities.webp", source: "SCENE" },
        { id: "duration", title: "How long the project runs", text: "Set how many years the project would last.", more: "From 10 to 70 years. SCENE uses it to estimate the benefits.", img: "duration.webp", source: "SCENE" },
        { id: "carbon-project", title: "Explore it as a carbon project", text: "See whether the project could earn carbon credits.", more: "If yes, SCENE works out the net emission reductions and removals, allowing for uncertainty, leakage and a buffer, as carbon market standards do.", img: "carbon-project.webp", source: "SCENE" },
      ],
    },
    {
      id: "benefits",
      title: "Benefits",
      question: "What should the tool tell you the NbS could bring? Note which benefits your person needs.",
      cards: [
        { id: "benefits-nature", title: "Benefits for nature", text: "Habitat kept connected, watersheds protected, habitat kept from loss, and threatened species helped.", more: "SCENE's Nature tab, worked out from the chosen pathways and activities. For our Borongan area: a 168 ha block of habitat kept connected, and 242 ha of habitat kept from loss over 30 years.", img: "benefits-nature.webp", source: "SCENE" },
        { id: "benefits-people", title: "Benefits for people", text: "Food and water, livelihoods, local governance, fair sharing of benefits, land rights and cultural heritage.", more: "SCENE's People tab. For each benefit it asks about the community, such as whether households have water and food all year.", img: "benefits-people.webp", source: "SCENE" },
        { id: "benefits-climate", title: "Benefits for the climate", text: "Emissions avoided, carbon taken up, people less exposed to hazards, and a cooler local climate.", more: "SCENE's Climate tab. For our Borongan area: 48,785 tonnes of CO2 avoided and 60,164 taken up over 30 years, but 0 people less exposed to hazards, because its regional data rated the area no risk. Net figures appear only for a carbon project.", img: "benefits-climate.webp", source: "SCENE" },
      ],
    },
    {
      id: "take-home",
      title: "Take it home",
      question: "What do you want to take away or do next?",
      cards: [
        { id: "pdf-summary", title: "A summary to download (PDF)", text: "A short report of the place and the recommendations.", more: "From our draft plan: something to bring to a planning meeting.", img: null, source: "Plan" },
        { id: "save", title: "Save my project and work on it with my team", text: "Keep my areas, results and documents in my account, and invite my team.", more: "SCENE's Save to my Project, for people with an account. Its project dashboard also sets who can see a project. The picture is from SCENE's home page.", img: "project-dashboard.webp", source: "SCENE" },
        { id: "documents", title: "A first draft of project documents", text: "The tool drafts a feasibility study and a document for carbon project standards.", more: "SCENE's Generate Document: a general feasibility study and a Climate, Community and Biodiversity (CCB) document aligned with Verra, filled in from the analysis. It needs an account; the picture is from SCENE's home page.", img: "documents.webp", source: "SCENE" },
        { id: "monitoring", title: "Plan and track monitoring", text: "Set what to monitor, and record results year after year.", more: "SCENE's Create Monitoring Plan: indicators, methods and how often, then a dashboard to track them. It needs an account; the picture is from SCENE's home page.", img: "monitoring.webp", source: "SCENE" },
        { id: "support", title: "Ask for support", text: "Send the project to a programme that helps it find support and funding.", more: "SCENE's project dashboard can send a project to its NbS Incubator.", img: null, source: "SCENE" },
        { id: "share-link", title: "Share a link", text: "Send someone a link that opens the same place and view.", more: "An idea, not yet in either tool.", img: null, source: "Plan" },
      ],
    },
  ],
};

// The one list of cards. The card guide, the digital board, the printed cards and
// the results page are all built from it, so the paper and the screen always match.
//
// source: where the card comes from
//   "SCENE"  - SCENE's NbS tool (https://nbstool-beta.scenecoalition.org/interactive-map)
//   "Demo"   - the NbS Map Platform demo built by BNHR
//   "Plan"   - the draft user journey (platform-info.pdf), not yet in any tool
//   "GeoNode"- comes with GeoNode, the base of the platform
// img: file in img/cards/, or null for a card with words only

window.NBS = {
  sources: {
    SCENE: "SCENE's NbS tool",
    Demo: "NbS demo",
    Plan: "Our draft plan",
    GeoNode: "GeoNode",
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
    { id: "ana", name: "Ana", role: "city planner in Borongan", story: "Ana works in the city planning office and is updating the city's climate and land use plans. Next month Ana has to tell the city council which barangays flood most and which nature-based solutions could help there.", needs: "Barangay-level answers, in plain words, that can be printed and brought to a meeting.", tech: "Not a map specialist. Uses an office laptop and a phone." },
    { id: "jun", name: "Jun", role: "technical officer at DENR-CCS", story: "Jun is building the national picture of nature-based solutions so they can grow beyond the three pilot cities. Jun writes policy briefs and reports that need numbers and maps to back them up.", needs: "Where NbS projects are across the country, what hazards and ecosystems they address, and data that can be cited.", tech: "Comfortable with maps; sometimes uses QGIS." },
    { id: "liza", name: "Liza", role: "keeps the platform up to date", story: "Liza will look after the platform after it launches, at DENR or the Foundation: adding new maps, approving the projects others submit, and updating the guides and the recommendations as the team learns.", needs: "To do all of this from the website, without calling a developer.", tech: "Knows computers well, but is new to this platform." },
    { id: "rosa", name: "Rosa", role: "runs an NGO's mangrove project", story: "Rosa's organisation, a member of the NbS Support Network, restores mangroves in Eastern Samar. Rosa wants the project on the national map, credited to the organisation, so partners and donors can find it.", needs: "A simple way to add a project and show its results.", tech: "Has a spreadsheet of sites and photos, but no map files." },
    { id: "paolo", name: "Paolo", role: "student researcher", story: "Paolo is writing a thesis on nature-based solutions for coastal cities and is looking for examples, data and maps to download.", needs: "To find data and examples quickly, and to know where they come from.", tech: "Learning QGIS. Has no account on the platform." },
  ],

  // The map information the tool may need. "holder" is our best guess at who has it;
  // tables correct it. "cards" are the cards that would use it.
  data: [
    { id: "D1", name: "Official flood and landslide hazard maps", text: "Which areas are prone to flooding and landslides, at barangay scale.", holder: "MGB (DENR); Project NOAH", cards: ["2.6", "3.1", "4.1"] },
    { id: "D2", name: "Storm surge maps", text: "How far inland storm surges can reach along the coast.", holder: "PAGASA; Project NOAH", cards: ["3.1", "4.1"] },
    { id: "D3", name: "Typhoons, rainfall, temperature and climate projections", text: "Past typhoon tracks, rainfall and temperature, and how they may change.", holder: "PAGASA", cards: ["2.6", "2.15"] },
    { id: "D4", name: "Official boundaries of barangays, cities and provinces", text: "Boundaries with the official codes, so every map lines up.", holder: "PSA; NAMRIA", cards: ["1.1", "1.3", "2.2"] },
    { id: "D5", name: "Population and households by barangay", text: "How many people and households live in each barangay.", holder: "PSA (census); LGUs (CBMS)", cards: ["2.11"] },
    { id: "D6", name: "Poverty, livelihoods and other social and economic data", text: "Income, jobs, livelihoods and poverty by barangay or city.", holder: "PSA; LGUs (CBMS)", cards: ["2.12", "4.3"] },
    { id: "D7", name: "Gender and vulnerable groups", text: "Data on women, children, older people, persons with disabilities and other groups.", holder: "PSA; LGUs (CBMS)", cards: ["4.3"] },
    { id: "D8", name: "Land cover and land use plans", text: "What covers the land today, and what the city plans for it.", holder: "NAMRIA (land cover); LGUs (land use plans)", cards: ["2.4"] },
    { id: "D9", name: "Forests and mangroves, and how they changed", text: "Where forests and mangroves are, and where they were lost or regrew.", holder: "DENR-FMB; Global Mangrove Watch", cards: ["2.1", "2.5", "3.2", "4.5"] },
    { id: "D10", name: "Rivers, coasts, wetlands, coral reefs and seagrass", text: "Water bodies and coastal ecosystems, which matter most in cities.", holder: "NAMRIA; DENR river basin office; BFAR; UP Marine Science Institute", cards: ["2.1", "4.1"] },
    { id: "D11", name: "Protected areas and key biodiversity areas", text: "Where nature is protected or especially important.", holder: "DENR-BMB", cards: ["2.2", "2.9"] },
    { id: "D12", name: "Wildlife and species records", text: "Which species have been seen where.", holder: "DENR-BMB; universities and research groups", cards: ["2.7", "2.8"] },
    { id: "D13", name: "Ancestral domains and land tenure", text: "Ancestral domain titles and forest tenure areas, so plans respect who holds the land.", holder: "NCIP; DENR-FMB", cards: ["2.2", "4.3"] },
    { id: "D14", name: "Elevation and slope", text: "How high and steep the land is, in detail.", holder: "NAMRIA", cards: ["2.3"] },
    { id: "D15", name: "Soil", text: "Soil types and their condition.", holder: "DA Bureau of Soils and Water Management", cards: ["2.14"] },
    { id: "D16", name: "Existing NbS projects", text: "Where NbS projects are, what they do, and their results.", holder: "NbS Support Network members; CRS; DENR", cards: ["4.1", "4.4"] },
  ],

  steps: [
    {
      id: "1",
      title: "Choose a place",
      question: "How do you want to pick the place you are looking at?",
      cards: [
        { id: "1.1", title: "Click a barangay", text: "Click any barangay on the map to choose it.", more: "In the NbS demo you pick a pilot city and a barangay, or click one on the map. SCENE does not go down to barangays.", img: "nbs-barangay.webp", source: "Demo" },
        { id: "1.2", title: "Search for a place by name", text: "Type a province or city and the map takes you there.", more: "SCENE finds provinces and cities. Our draft plan asks for searches down to the barangay.", img: "search-results.webp", source: "SCENE" },
        { id: "1.3", title: "See the place's boundary", text: "The map outlines the city or province you searched for.", more: "SCENE shows the boundary as a guide, so you can draw your area inside it.", img: "boundary.webp", source: "SCENE" },
        { id: "1.4", title: "Draw your own area", text: "Click points on the map to outline the area you care about.", more: "Useful when your site does not follow a barangay or city boundary, such as a watershed or a stretch of coast.", img: "draw.webp", source: "SCENE" },
        { id: "1.5", title: "Upload a map of your area", text: "Use a map file you already have of your site.", more: "For organisations that already mapped their project area, for example in QGIS or Google Earth.", img: "upload.webp", source: "SCENE" },
        { id: "1.6", title: "Check the size of the area", text: "The tool tells you how big your area is before it looks into it.", more: "A quick check that you drew what you meant to.", img: "area-size.webp", source: "SCENE" },
        { id: "1.7", title: "Find where I am", text: "Zoom to where you are standing now.", more: "Handy on a phone during a site visit.", img: "map-tools.webp", source: "SCENE" },
        { id: "1.8", title: "Change the background map", text: "Switch between a street map, a plain map or a satellite view.", more: "The satellite view helps people recognise their place.", img: "basemaps.webp", source: "SCENE" },
        { id: "1.9", title: "Turn map information on and off", text: "Show land cover, mangroves, protected areas and more, grouped by theme.", more: "SCENE groups its map information into site, nature, climate, people and country permits, and lists the year and source of each.", img: "layers-list.webp", source: "SCENE" },
      ],
    },
    {
      id: "2",
      title: "What's there",
      question: "What do you need to know about the place?",
      cards: [
        { id: "2.1", title: "Kinds of ecosystems", text: "How much of the area is forest, mangrove, peatland or something else.", more: "SCENE looks only at forest, mangrove and peatland. Cities also have rivers, coasts, wetlands and urban green spaces.", img: "ecosystems.webp", source: "SCENE" },
        { id: "2.2", title: "Which city and province", text: "Where the area is, and whether it overlaps a protected area.", more: "SCENE uses world boundaries. Philippine maps use official barangay, city and province boundaries.", img: "administration.webp", source: "SCENE" },
        { id: "2.3", title: "How high and steep the land is", text: "The elevation and how much of the land is flat or steep.", more: "Steep and low-lying land shape which approaches can work.", img: "terrain.webp", source: "SCENE" },
        { id: "2.4", title: "What covers the land", text: "How much is crops, rice, shrubs, forest, water or settlements.", more: "SCENE's land cover comes from satellite images and has not been checked on the ground.", img: "landcover.webp", source: "SCENE" },
        { id: "2.5", title: "Forest lost, and where the risk is", text: "How much forest was lost in ten years, and where loss is likely next.", more: "SCENE ranks how likely forest loss is compared with the rest of the country.", img: "deforestation.webp", source: "SCENE" },
        { id: "2.6", title: "Disaster risks", text: "The risk of drought, flood, fire, landslide and typhoon.", more: "SCENE uses a regional dataset; it rated Borongan as having no flood risk. Philippine hazard maps (MGB, PAGASA, Project NOAH) work at barangay level.", img: "disaster-risk.webp", source: "SCENE" },
        { id: "2.7", title: "Wildlife that may live there", text: "How many kinds of amphibians, birds, mammals and reptiles may be found.", more: "From the IUCN Red List: where species may live, not where they were seen.", img: "wildlife.webp", source: "SCENE" },
        { id: "2.8", title: "Important species seen there", text: "Key species recorded in or near the area.", more: "SCENE had no records for Borongan; coverage varies across the region.", img: null, source: "SCENE" },
        { id: "2.9", title: "Importance for nature, water and carbon", text: "How the area ranks worldwide for biodiversity, water and carbon.", more: "A global ranking, meant as a broad guide rather than for local planning.", img: "conservation.webp", source: "SCENE" },
        { id: "2.10", title: "How healthy the forest is", text: "Whether the forest is intact or broken up and under pressure.", more: "Based on the Forest Landscape Integrity Index.", img: "forest-integrity.webp", source: "SCENE" },
        { id: "2.11", title: "How many people live there", text: "The number of people by sex and age, and households.", more: "SCENE estimates people from a population grid and counts households for the whole region. Philippine census data goes down to the barangay.", img: "population.webp", source: "SCENE" },
        { id: "2.12", title: "How vulnerable people and places are", text: "Physical, environmental, economic and social vulnerability.", more: "Scores from 0 to 1 that summarise how exposed the area is to climate hazards.", img: "vulnerability.webp", source: "SCENE" },
        { id: "2.13", title: "Carbon stored", text: "How much carbon the area stores in trees, roots and soil.", more: "Important for carbon projects and climate reporting.", img: "carbon.webp", source: "SCENE" },
        { id: "2.14", title: "Soil types", text: "The main kinds of soil in the area.", more: "Soil affects what can be planted and restored.", img: "soil.webp", source: "SCENE" },
        { id: "2.15", title: "Rainfall and temperature", text: "Monthly rainfall and temperature through the year.", more: "SCENE shows long-term averages.", img: "climate-ledger.webp", source: "SCENE" },
      ],
    },
    {
      id: "3",
      title: "Threats",
      question: "What is putting the place at risk?",
      cards: [
        { id: "3.1", title: "Hazards in the barangay", text: "Flooding, landslides, storm surge and other hazards present in the barangay.", more: "Our draft plan calls this the threat presence. The NbS demo shows a hazard and land profile for each barangay.", img: "nbs-recommended.webp", source: "Demo" },
        { id: "3.2", title: "Damage to each ecosystem", text: "How much of each ecosystem is intact, damaged or lost.", more: "SCENE's threat profile summarises forest, mangrove and peatland.", img: "threat-summary.webp", source: "SCENE" },
        { id: "3.3", title: "A map of the damage", text: "Where in the area the damage happened.", more: "Shows remaining, disturbed, lost and regrown forest.", img: "disturbance-map.webp", source: "SCENE" },
        { id: "3.4", title: "What causes the damage", text: "Whether damage comes from people, nature or unknown causes.", more: "For Borongan, SCENE could not identify the causes.", img: "disturbance-drivers.webp", source: "SCENE" },
        { id: "3.5", title: "A reminder to check on the ground", text: "Each result says where its data comes from and that it needs checking on site.", more: "SCENE adds a disclaimer and the data source under every result.", img: "field-verification.webp", source: "SCENE" },
      ],
    },
    {
      id: "4",
      title: "What NbS could work",
      question: "What should the tool suggest for the place?",
      cards: [
        { id: "4.1", title: "Recommended NbS approaches", text: "A ranked list of NbS approaches that suit the place.", more: "Ours, not in SCENE. The NbS demo ranks approaches for a pilot barangay from its hazards and land. The criteria behind the ranking are discussed this afternoon.", img: "nbs-recommended.webp", source: "Demo" },
        { id: "4.2", title: "A short profile of the place", text: "The key facts about the barangay in one place.", more: "Our draft plan calls this the site profile.", img: null, source: "Plan" },
        { id: "4.3", title: "Other things to consider", text: "Livelihoods, gender, biodiversity and monitoring.", more: "From our draft plan: things that matter for a good NbS but are not on a map.", img: null, source: "Plan" },
        { id: "4.4", title: "Guides on each approach", text: "A page for each approach: what it is, where it fits, what it costs.", more: "The NbS demo has a factsheet for each of ten approaches, with filters by hazard and ecosystem.", img: "nbs-approaches.webp", source: "Demo" },
        { id: "4.5", title: "Protect, manage or restore", text: "How much of each ecosystem could be protected, managed or restored.", more: "SCENE's pathway step, in hectares, for forest, mangrove and peatland.", img: "pathway.webp", source: "SCENE" },
        { id: "4.6", title: "Choose activities", text: "Pick the activities for each pathway, such as replanting.", more: "SCENE had no activities listed for Borongan.", img: null, source: "SCENE" },
        { id: "4.7", title: "How long the project runs", text: "Set how many years the project would last.", more: "Used by SCENE to estimate benefits.", img: null, source: "SCENE" },
        { id: "4.8", title: "Explore it as a carbon project", text: "See whether the project could earn carbon credits.", more: "SCENE follows carbon market standards.", img: "carbon-project.webp", source: "SCENE" },
      ],
    },
    {
      id: "5",
      title: "Take it home",
      question: "What do you want to take away or do next?",
      cards: [
        { id: "5.1", title: "A summary to download (PDF)", text: "A short report of the place and the recommendations.", more: "From our draft plan: something to bring to a planning meeting.", img: null, source: "Plan" },
        { id: "5.2", title: "The benefits of the project", text: "An estimate of what the project would bring, such as carbon and area restored.", more: "SCENE's last step. It could not be calculated for Borongan.", img: null, source: "SCENE" },
        { id: "5.3", title: "Download the map of the area", text: "Save the area you drew as a map file.", more: "SCENE's Export area button.", img: "export-area.webp", source: "SCENE" },
        { id: "5.4", title: "A first draft of project documents", text: "The tool drafts a feasibility study for the project.", more: "SCENE drafts documents for carbon project standards.", img: null, source: "SCENE" },
        { id: "5.5", title: "Save my place and come back later", text: "Keep my areas and results in my account.", more: "SCENE's project portfolio, for people with an account.", img: null, source: "SCENE" },
        { id: "5.6", title: "Plan and track monitoring", text: "Set what to monitor, and record results year after year.", more: "SCENE has a monitoring plan and tracking dashboard.", img: null, source: "SCENE" },
        { id: "5.7", title: "Share a link", text: "Send someone a link that opens the same place and view.", more: "An idea, not yet in either tool.", img: null, source: "Plan" },
      ],
    },
    {
      id: "6",
      title: "Keeping it running",
      question: "Who keeps the tool up to date, and how?",
      cards: [
        { id: "6.1", title: "Add or update map information", text: "Upload a new or better map so the tool uses it.", more: "Comes with GeoNode: upload a map file, add its details, and it can appear on the map.", img: "nbs-upload.webp", source: "GeoNode" },
        { id: "6.2", title: "Review and approve what others add", text: "Check projects and maps before the public sees them.", more: "Comes with GeoNode: members upload, a reviewer approves, then it is shared with the public.", img: "nbs-share.webp", source: "GeoNode" },
        { id: "6.3", title: "Update how approaches are recommended", text: "Change the criteria behind the recommendations as we learn.", more: "From our draft plan: the recommendation table should be easy to update.", img: null, source: "Plan" },
        { id: "6.4", title: "Edit the guides and approach pages", text: "Change the text and pictures of guides without a developer.", more: "Comes with GeoNode: story pages are edited in the browser.", img: "nbs-story-editor.webp", source: "GeoNode" },
        { id: "6.5", title: "Give people accounts and roles", text: "Decide who can add, review and change things.", more: "Comes with GeoNode.", img: null, source: "GeoNode" },
        { id: "6.6", title: "See how the tool is used", text: "How many people use it, and for which places.", more: "From the terms of reference: usage reports for the people running the platform.", img: null, source: "Plan" },
      ],
    },
  ],
};

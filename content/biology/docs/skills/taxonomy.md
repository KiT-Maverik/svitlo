# Biology — Skills Taxonomy

Date: 2026-10-28
Approved: 2026-10-29

**Editorial decision history (October 28–29, 2026):** [Skill Taxonomy Review](../history/skill-taxonomy-review.md). This is a reference record of editorial agreements and reasons for changes; the canonical list of Skills and their descriptions remain in this document.

> **Status: APPROVED.** Following methodologist review, the Domain names were aligned with subject disciplines, mechanical descriptions were replaced with substantive ones, and candidate Skill granularity was revised. The complete 147-Skill Biology taxonomy was approved by the editor on October 29, 2026. Approval concerns the editorial taxonomy, **not** runtime implementation; none of its entity Code files has been created.

The catalog describes **independent subject-specific competencies**, not a list of Lessons or school grades. The taxonomy covers Biology as a whole discipline, including cellular mechanisms, genetics, evolution, physiology, and biotechnology. It sets no age or instructional-level ceiling: Curricula determine which material to select, its depth, and its sequence.

**Subject boundaries:** Biology covers the structure and life processes of organisms, biological relationships within ecosystems, and principles of heredity; Geography covers the geographical distribution of natural zones and climate; Health & Safety covers hygiene, habits, and behavioral safety. The encyclopedic **“Who Is This?”** collection is a set of Lessons, not a separate Skill or SkillGroup.

**Editorial references:** [Subject Proposition](../../../../studio/Subject%20Proposition.md), [Methodologist Persona](../../../../studio/personas/methodist.persona.md), [Create Skills Taxonomy](../../../../studio/skills/create-skills-taxonomy.skill.md), [Skill](../../../../studio/docs/entities/skill.md), [SkillGroup](../../../../studio/docs/entities/skill-group.md), [SkillDomain](../../../../studio/docs/entities/skill-domain.md). External reference points for later item-by-item verification: the New Ukrainian School (NUS) and Ukrainian model Biology curricula, NGSS, Cambridge Primary Science, Australian Curriculum v9, and England Science. **No completed curriculum crosswalk or percentage coverage is claimed.**

## SUMMARY

Domains: 11
Groups: 26
Skills: 147

Code files: 0/11 Domains · 0/26 Groups · 0/147 Skills

## DOMAINS

### Characteristics of Living Things

Slug: characteristicsOfLivingThings
Action: create
Status: implemented

Groups: 0 · Skills: 1

[characteristicsOfLivingThings.data.ts](../../data/skills/characteristicsOfLivingThings/characteristicsOfLivingThings.data.ts)

Methodological description: Life processes, biological origin, and the distinction between living organisms, dead remains, and things that have never been alive. This distinction requires consideration of actual life processes rather than appearance or movement alone.
User-friendly description: Discover what makes something alive, what was once alive, and what has never been living.

**Methodological note on classification tasks:** generic actions such as “choose a grouping criterion,” “sort organisms by a trait,” “apply an identification key,” “explain a grouping criterion,” and “identify traits for grouping” **do not create separate Biology Skill IDs here**. They are ways to construct interactive Questions, cards, practice, and checks of existing subject knowledge. For example, “sort mammals and reptiles into groups” assesses **knowledge of the respective animals’ distinguishing characteristics**, not a separate universal ability to drag cards. Criteria and identification keys remain permissible tools for Lessons; a separate Skill is warranted only for an independent biological outcome not covered by subject-specific recognition Skills. **Process conclusion:** this editorial precedent does not prohibit all classification or modeling Skills. For any new or existing similar candidate, the methodologist must present the editor with a concrete Question, the competency it might assess, existing Skill(s), and alternatives, and **must not add, remove, or relocate such Skills before the editor’s explicit decision**. Rule: [Create Skills Taxonomy — mandatory editorial stop](../../../../studio/skills/create-skills-taxonomy.skill.md).

#### Classify objects as living, dead, or never alive

Slug: classifyObjectsAsLivingDeadOrNeverAlive
Action: create
Status: implemented

[classifyObjectsAsLivingDeadOrNeverAlive.data.ts](../../data/skills/characteristicsOfLivingThings/skills/classifyObjectsAsLivingDeadOrNeverAlive.data.ts)

Methodological description: Use evidence of life processes and origin to classify an object and justify the decision through diagnostic features. A living tree carries out life processes, a dead leaf once belonged to a living organism, and a stone has no biological origin. Do not equate dead organisms with their remains or with products of biological origin.
User-friendly description: Use evidence to decide whether something is living, dead or has never been alive.

### General and Cell Biology

Slug: generalAndCellBiology
Action: create
Status: implemented

Groups: 4 · Skills: 15

[generalAndCellBiology.data.ts](../../data/skills/generalAndCellBiology/generalAndCellBiology.data.ts)

Methodological description: Shared principles of cellular organism organization, from the cell to interactions among organs, as well as metabolism, growth, and responses. Specific human systems and particular taxa are addressed in their respective Domains.
User-friendly description: Explore how cells and body structures work together to support the processes of life.

#### Cellular Structure

Slug: cellularStructure
Action: create
Status: implemented

Skills: 4

[cellularStructure.data.ts](../../data/skills/generalAndCellBiology/cellularStructure/cellularStructure.data.ts)

Methodological description: Cells have membranes and internal components that sustain life processes; diagrams help reveal commonalities and differences among different cells.
User-friendly description: Learn what cells are made of and how their structures help them function.

##### Recognize the Cell as a Structural Unit

Slug: recognizeTheCellAsAStructuralUnit
Action: create
Status: implemented

[recognizeTheCellAsAStructuralUnit.data.ts](../../data/skills/generalAndCellBiology/cellularStructure/skills/recognizeTheCellAsAStructuralUnit.data.ts)

Methodological description: Understand that the tissues and bodies of cellular organisms consist of microscopic units, each with its own boundary.
User-friendly description: Understand why cells are the basic structural units of living organisms.

##### Distinguish Unicellular and Multicellular Organisms

Slug: distinguishUnicellularAndMulticellularOrganisms
Action: create
Status: implemented

[distinguishUnicellularAndMulticellularOrganisms.data.ts](../../data/skills/generalAndCellBiology/cellularStructure/skills/distinguishUnicellularAndMulticellularOrganisms.data.ts)

Methodological description: Determine whether a single cell carries out all functions of an organism or many specialized cells work together.
User-friendly description: Distinguish organisms made of one cell from those made of many specialized cells.

##### Distinguish Plant and Animal Cells by Structural Features

Slug: distinguishPlantAndAnimalCellsByStructuralFeatures
Action: create
Status: implemented

[distinguishPlantAndAnimalCellsByStructuralFeatures.data.ts](../../data/skills/generalAndCellBiology/cellularStructure/skills/distinguishPlantAndAnimalCellsByStructuralFeatures.data.ts)

Methodological description: Distinguish characteristic cell features: the cell wall and plastids in plant cells and the absence of these structures in animal cells. Do not assume that all plant cells contain chloroplasts (many root cells, for instance, do not). An illustration, a textual description, or an interactive model are alternative ways of assessing the competency, not part of the Skill name.
User-friendly description: Recognize key features of plant and animal cells without assuming every cell looks the same.

##### Relate Major Cell Structures to Their Functions

Slug: relateMajorCellStructuresToTheirFunctions
Action: create
Status: implemented

[relateMajorCellStructuresToTheirFunctions.data.ts](../../data/skills/generalAndCellBiology/cellularStructure/skills/relateMajorCellStructuresToTheirFunctions.data.ts)

Methodological description: Associate the membrane with selective exchange, the nucleus with genetic information, and other depicted organelles with their main cellular functions.
User-friendly description: Connect the structures inside cells with the jobs they perform.

#### Cell Division

Slug: cellDivision
Action: create
Status: implemented

Skills: 2

[cellDivision.data.ts](../../data/skills/generalAndCellBiology/cellDivision/cellDivision.data.ts)

Methodological description: The cell cycle involves division of genetic material and cytoplasm; mitosis supports growth and tissue renewal, while meiosis is associated with sexual reproduction and inherited variation.
User-friendly description: Discover how cells divide to support growth, renewal and reproduction.

##### Explain Mitosis

Slug: explainMitosis
Action: create
Status: implemented

[explainMitosis.data.ts](../../data/skills/generalAndCellBiology/cellDivision/skills/explainMitosis.data.ts)

Methodological description: Explain division of a eukaryotic cell nucleus while maintaining the chromosome number and distributing replicated DNA between daughter nuclei. Distinguish mitosis from cytokinesis and explain its roles in growth, tissue renewal, and asexual reproduction.
User-friendly description: Explore how mitosis divides genetic material between daughter nuclei.

##### Explain Meiosis

Slug: explainMeiosis
Action: create
Status: implemented

[explainMeiosis.data.ts](../../data/skills/generalAndCellBiology/cellDivision/skills/explainMeiosis.data.ts)

Methodological description: Explain successive divisions following a single round of DNA replication, the halving of chromosome number, recombination, and independent chromosome assortment. Distinguish meiotic products in animals and plants: in plants, meiosis may produce spores rather than gametes directly.
User-friendly description: Learn how meiosis produces cells with fewer chromosomes and creates genetic variation.

#### Levels of Organization

Slug: levelsOfOrganization
Action: create
Status: implemented

Skills: 4

[levelsOfOrganization.data.ts](../../data/skills/generalAndCellBiology/levelsOfOrganization/levelsOfOrganization.data.ts)

Methodological description: Parts of cellular organisms form nested levels; the functioning of a whole depends on the coordinated work of its structures.
User-friendly description: Explore how cells, tissues, organs and systems fit together in living organisms.

##### Distinguish a Part of an Organism from a Whole Organism

Slug: distinguishAPartOfAnOrganismFromAWholeOrganism
Action: create
Status: implemented

[distinguishAPartOfAnOrganismFromAWholeOrganism.data.ts](../../data/skills/generalAndCellBiology/levelsOfOrganization/skills/distinguishAPartOfAnOrganismFromAWholeOrganism.data.ts)

Methodological description: Identify the boundary between an individual organ, a part of that organ, and an organism as an independent living system.
User-friendly description: Distinguish a single organ or body part from a complete living organism.

##### Order the Levels “Cell → Tissue → Organ → System”

Slug: orderTheLevelsCellTissueOrganSystem
Action: create
Status: implemented

[orderTheLevelsCellTissueOrganSystem.data.ts](../../data/skills/generalAndCellBiology/levelsOfOrganization/skills/orderTheLevelsCellTissueOrganSystem.data.ts)

Methodological description: Establish how cells form tissues, tissues form organs, and organs can work together within a system.
User-friendly description: Arrange cells, tissues, organs and organ systems by their levels of organization.

##### Explain an Organ’s Function in an Organism

Slug: explainAnOrgansFunctionInAnOrganism
Action: create
Status: implemented

[explainAnOrgansFunctionInAnOrganism.data.ts](../../data/skills/generalAndCellBiology/levelsOfOrganization/skills/explainAnOrgansFunctionInAnOrganism.data.ts)

Methodological description: Explain how a particular structure contributes to overall life processes, such as absorbing or transporting substances.
User-friendly description: Explain how a particular organ helps the entire organism function.

##### Explain the Interdependence of Organs

Slug: explainTheInterdependenceOfOrgans
Action: create
Status: implemented

[explainTheInterdependenceOfOrgans.data.ts](../../data/skills/generalAndCellBiology/levelsOfOrganization/skills/explainTheInterdependenceOfOrgans.data.ts)

Methodological description: Show why a disruption in one system can alter the functioning of another.
User-friendly description: Explore why different organs depend on one another.

#### Life Processes

Slug: lifeProcesses
Action: create
Status: implemented

Skills: 5

[lifeProcesses.data.ts](../../data/skills/generalAndCellBiology/lifeProcesses/lifeProcesses.data.ts)

Methodological description: Exchange of matter and energy, increases in size, changes in form, and responses to conditions are manifestations of life that can be observed or modeled.
User-friendly description: Discover how organisms obtain resources, grow and respond to their surroundings.

##### Identify Examples of Nutrition

Slug: identifyExamplesOfNutrition
Action: create
Status: implemented

[identifyExamplesOfNutrition.data.ts](../../data/skills/generalAndCellBiology/lifeProcesses/skills/identifyExamplesOfNutrition.data.ts)

Methodological description: Recognize the acquisition and use of nutrients by organisms as nutrition, distinguishing forms of nutrition across different organisms.
User-friendly description: Recognize the different ways organisms obtain and use nutrients.

##### Explain Photosynthesis

Slug: explainPhotosynthesis
Action: create
Status: implemented

[explainPhotosynthesis.data.ts](../../data/skills/generalAndCellBiology/lifeProcesses/skills/explainPhotosynthesis.data.ts)

Methodological description: Explain the conversion of light energy into chemical energy as photosynthetic organisms form organic substances from carbon dioxide and water; identify the roles of chloroplasts and pigments and the release of oxygen during oxygenic photosynthesis. Do not equate photosynthesis with mineral nutrition or respiration.
User-friendly description: Explain how photosynthetic organisms use light to make organic substances.

##### Explain Cellular Respiration

Slug: explainCellularRespiration
Action: create
Status: implemented

[explainCellularRespiration.data.ts](../../data/skills/generalAndCellBiology/lifeProcesses/skills/explainCellularRespiration.data.ts)

Methodological description: Explain how cells obtain usable energy by breaking down organic compounds while synthesizing ATP. Distinguish aerobic and anaerobic pathways, and do not equate cellular respiration with lung ventilation or gas exchange in respiratory organs.
User-friendly description: Learn how cells release usable energy from organic substances.

##### Recognize Growth and Development

Slug: recognizeGrowthAndDevelopment
Action: create
Status: implemented

[recognizeGrowthAndDevelopment.data.ts](../../data/skills/generalAndCellBiology/lifeProcesses/skills/recognizeGrowthAndDevelopment.data.ts)

Methodological description: Distinguish increases in mass or size from changes in structure and function during transitions between life stages.
User-friendly description: Distinguish an increase in size from changes in an organism's development.

##### Recognize Responses to Stimuli

Slug: recognizeResponsesToStimuli
Action: create
Status: implemented

[recognizeResponsesToStimuli.data.ts](../../data/skills/generalAndCellBiology/lifeProcesses/skills/recognizeResponsesToStimuli.data.ts)

Methodological description: Establish how light, touch, or a chemical signal elicits a change in an organism’s state or movement.
User-friendly description: Recognize how living things respond to light, touch and other signals.

### Botany

Slug: botany
Action: create
Status: implemented

Groups: 5 · Skills: 21

[botany.data.ts](../../data/skills/botany/botany.data.ts)

Methodological description: Study of plants as organisms capable of photosynthesis: vegetative and reproductive organ structure, life cycles, and the dependence of growth on environmental conditions. Unlike Ecology, the focus is on the plant rather than interactions within a community.
User-friendly description: Explore how plants are built, grow, reproduce and respond to their environments.

#### Plant Diversity

Slug: plantDiversity
Action: create
Status: implemented

Skills: 6

[plantDiversity.data.ts](../../data/skills/botany/plantDiversity/plantDiversity.data.ts)

Methodological description: External structure, branching patterns, and seasonality provide grounds for comparing familiar species without equating growth form with biological relatedness.
User-friendly description: Recognize the variety of plants using their distinctive features.

##### Recognize Common Local Plants

Slug: recognizeCommonLocalPlants
Action: create
Status: implemented

[recognizeCommonLocalPlants.data.ts](../../data/skills/botany/plantDiversity/skills/recognizeCommonLocalPlants.data.ts)

Methodological description: Identify familiar local species by characteristic combinations of leaves, stems, flowers, or fruits, rather than color alone.
User-friendly description: Identify familiar local plants using combinations of leaves, stems and other features.

##### Distinguish Trees, Shrubs, and Herbaceous Plants

Slug: distinguishTreesShrubsAndHerbaceousPlants
Action: create
Status: implemented

[distinguishTreesShrubsAndHerbaceousPlants.data.ts](../../data/skills/botany/plantDiversity/skills/distinguishTreesShrubsAndHerbaceousPlants.data.ts)

Methodological description: Determine growth form from the type and branching pattern of woody or herbaceous stems.
User-friendly description: Distinguish trees, shrubs and herbaceous plants by how their stems grow.

##### Distinguish Deciduous and Evergreen Plants

Slug: distinguishDeciduousAndEvergreenPlants
Action: create
Status: implemented

[distinguishDeciduousAndEvergreenPlants.data.ts](../../data/skills/botany/plantDiversity/skills/distinguishDeciduousAndEvergreenPlants.data.ts)

Methodological description: Distinguish annual leaf shedding from retaining foliage throughout the year; this is not equivalent to the distinction between conifers and broadleaf plants.
User-friendly description: Recognize how evergreen and deciduous plants differ in leaf retention.

##### Recognize Bryophyte Characteristics

Slug: recognizeBryophyteCharacteristics
Action: create
Status: implemented

[recognizeBryophyteCharacteristics.data.ts](../../data/skills/botany/plantDiversity/skills/recognizeBryophyteCharacteristics.data.ts)

Methodological description: Recognize nonvascular land plants that produce spores and whose life cycle is dominated by the gametophyte; do not call rhizoids true roots.
User-friendly description: Learn the characteristic features and life cycles of mosses and related plants.

##### Recognize Fern and Fern-Ally Characteristics

Slug: recognizeFernAndFernAllyCharacteristics
Action: create
Status: implemented

[recognizeFernAndFernAllyCharacteristics.data.ts](../../data/skills/botany/plantDiversity/skills/recognizeFernAndFernAllyCharacteristics.data.ts)

Methodological description: Identify vascular spore-producing plants by the structure of their shoots and sporangia; distinguish them from bryophytes and seed plants.
User-friendly description: Recognize ferns and related vascular plants that reproduce using spores.

##### Distinguish Gymnosperms and Angiosperms

Slug: distinguishGymnospermsAndAngiosperms
Action: create
Status: implemented

[distinguishGymnospermsAndAngiosperms.data.ts](../../data/skills/botany/plantDiversity/skills/distinguishGymnospermsAndAngiosperms.data.ts)

Methodological description: Explain the difference between seed plants with exposed ovules and flowering plants whose seeds develop inside a fruit; do not equate this division with evergreen habit or leaf shape.
User-friendly description: Distinguish gymnosperms from flowering plants by their seed structures.

#### Plant Structure

Slug: plantStructure
Action: create
Status: implemented

Skills: 2

[plantStructure.data.ts](../../data/skills/botany/plantStructure/plantStructure.data.ts)

Methodological description: Plant organs perform different tasks: anchorage, absorption, transport, photosynthesis, and reproduction; their functions must be distinguished from their names.
User-friendly description: Learn how roots, stems, leaves and reproductive parts serve different purposes.

##### Identify Major Plant Organs

Slug: identifyMajorPlantOrgans
Action: create
Status: implemented

[identifyMajorPlantOrgans.data.ts](../../data/skills/botany/plantStructure/skills/identifyMajorPlantOrgans.data.ts)

Methodological description: On a plant or model, distinguish roots, stems, leaves, and reproductive organs, including flowers, by their position and distinguishing characteristics.
User-friendly description: Identify the major structures of a plant and where they are found.

##### Relate Plant Organs to Their Functions

Slug: relatePlantOrgansToTheirFunctions
Action: create
Status: implemented

[relatePlantOrgansToTheirFunctions.data.ts](../../data/skills/botany/plantStructure/skills/relatePlantOrgansToTheirFunctions.data.ts)

Methodological description: Explain which structures enable water absorption, support, substance transport, photosynthesis, and seed production.
User-friendly description: Connect each plant organ with the functions it performs.

#### Nutrition and Growth

Slug: nutritionAndGrowth
Action: create
Status: implemented

Skills: 5

[nutritionAndGrowth.data.ts](../../data/skills/botany/nutritionAndGrowth/nutritionAndGrowth.data.ts)

Methodological description: Water, light, atmospheric gases, and minerals play different roles; deviations in environmental conditions change the rate and pattern of plant development.
User-friendly description: Explore how water, light, air and minerals support plant growth.

##### Explain Plants’ Need for Water

Slug: explainPlantsNeedForWater
Action: create
Status: implemented

[explainPlantsNeedForWater.data.ts](../../data/skills/botany/nutritionAndGrowth/skills/explainPlantsNeedForWater.data.ts)

Methodological description: Explain water’s involvement in substance transport, cell maintenance, and photosynthesis rather than treating water merely as a plant’s 'drink'.
User-friendly description: Understand why plants need water for transport, cell function and photosynthesis.

##### Explain the Role of Light

Slug: explainTheRoleOfLight
Action: create
Status: implemented

[explainTheRoleOfLight.data.ts](../../data/skills/botany/nutritionAndGrowth/skills/explainTheRoleOfLight.data.ts)

Methodological description: Relate illumination to the production of organic substances in photosynthesizing parts of plants.
User-friendly description: Explain why light is essential for making food through photosynthesis.

##### Explain the Role of Air

Slug: explainTheRoleOfAir
Action: create
Status: implemented

[explainTheRoleOfAir.data.ts](../../data/skills/botany/nutritionAndGrowth/skills/explainTheRoleOfAir.data.ts)

Methodological description: Distinguish the use of carbon dioxide during photosynthesis from the use of oxygen during cellular respiration.
User-friendly description: Distinguish plants' use of carbon dioxide and oxygen in different processes.

##### Identify the Role of Mineral Nutrition

Slug: identifyTheRoleOfMineralNutrition
Action: create
Status: implemented

[identifyTheRoleOfMineralNutrition.data.ts](../../data/skills/botany/nutritionAndGrowth/skills/identifyTheRoleOfMineralNutrition.data.ts)

Methodological description: Explain why mineral elements from soil are necessary for tissue formation, although they do not replace food as an energy source.
User-friendly description: Understand why mineral nutrients help plants build healthy tissues.

##### Predict Effects of Changing Conditions on Plant Growth

Slug: predictEffectsOfChangingConditionsOnPlantGrowth
Action: create
Status: implemented

[predictEffectsOfChangingConditionsOnPlantGrowth.data.ts](../../data/skills/botany/nutritionAndGrowth/skills/predictEffectsOfChangingConditionsOnPlantGrowth.data.ts)

Methodological description: Predict observable changes in growth when light, water, or minerals are insufficient, while accounting for other conditions held constant.
User-friendly description: Predict how changes in resources affect a plant's growth.

#### Reproduction and Development

Slug: reproductionAndDevelopment
Action: create
Status: implemented

Skills: 5

[reproductionAndDevelopment.data.ts](../../data/skills/botany/reproductionAndDevelopment/reproductionAndDevelopment.data.ts)

Methodological description: A seed plant progresses from a seed through a seedling to producing the next generation; pollination and seed dispersal occur at different stages.
User-friendly description: Follow how plants reproduce and develop through their life cycles.

##### Identify the Role of a Seed

Slug: identifyTheRoleOfASeed
Action: create
Status: implemented

[identifyTheRoleOfASeed.data.ts](../../data/skills/botany/reproductionAndDevelopment/skills/identifyTheRoleOfASeed.data.ts)

Methodological description: Understand that a seed contains an embryo and a store or source of nutrients for initial growth.
User-friendly description: Explore how a seed supports the first stage of a new plant's growth.

##### Describe Germination

Slug: describeGermination
Action: create
Status: implemented

[describeGermination.data.ts](../../data/skills/botany/reproductionAndDevelopment/skills/describeGermination.data.ts)

Methodological description: Establish the order in which the embryonic root and shoot emerge, as well as the roles of water and an appropriate temperature.
User-friendly description: Describe how a seed begins growing roots and shoots.

##### Sequence Stages of a Flowering Plant’s Life Cycle

Slug: sequenceStagesOfAFloweringPlantsLifeCycle
Action: create
Status: implemented

[sequenceStagesOfAFloweringPlantsLifeCycle.data.ts](../../data/skills/botany/reproductionAndDevelopment/skills/sequenceStagesOfAFloweringPlantsLifeCycle.data.ts)

Methodological description: Order stages from seed to mature plant, flowering, and formation of new seeds.
User-friendly description: Follow the stages from seed to mature flowering plant and new seeds.

##### Explain the Role of Pollination

Slug: explainTheRoleOfPollination
Action: create
Status: implemented

[explainTheRoleOfPollination.data.ts](../../data/skills/botany/reproductionAndDevelopment/skills/explainTheRoleOfPollination.data.ts)

Methodological description: Explain transfer of pollen to a stigma or another receptive structure as a step preceding fertilization.
User-friendly description: Explain the part pollination plays before fertilization.

##### Relate Fruit Characteristics to Seed Dispersal Methods

Slug: relateFruitCharacteristicsToSeedDispersalMethods
Action: create
Status: implemented

[relateFruitCharacteristicsToSeedDispersalMethods.data.ts](../../data/skills/botany/reproductionAndDevelopment/skills/relateFruitCharacteristicsToSeedDispersalMethods.data.ts)

Methodological description: Compare adaptations of fruits and seeds to transport by wind, water, or animals.
User-friendly description: Connect the shapes of fruits and seeds with the ways they spread.

#### Plant Adaptations

Slug: plantAdaptations
Action: create
Status: implemented

Skills: 3

[plantAdaptations.data.ts](../../data/skills/botany/plantAdaptations/plantAdaptations.data.ts)

Methodological description: Leaf, root, and shoot forms and seasonal changes can improve survival when water or light is limited or temperatures are low.
User-friendly description: See how plant features help them survive in different environments.

##### Recognize Adaptations to the Environment

Slug: recognizeAdaptationsToTheEnvironment
Action: create
Status: implemented

[recognizeAdaptationsToTheEnvironment.data.ts](../../data/skills/botany/plantAdaptations/skills/recognizeAdaptationsToTheEnvironment.data.ts)

Methodological description: Identify particular morphological or physiological adaptations in plants, such as a waxy covering, water storage, or leaf shedding, and distinguish them from incidental characteristics. The central competency is recognizing an adaptation from its characteristic manifestations.
User-friendly description: Recognize special features that help plants cope with their surroundings.

##### Relate Plant Structural Features to Environmental Conditions

Slug: relatePlantStructuralFeaturesToEnvironmentalConditions
Action: create
Status: implemented

[relatePlantStructuralFeaturesToEnvironmentalConditions.data.ts](../../data/skills/botany/plantAdaptations/skills/relatePlantStructuralFeaturesToEnvironmentalConditions.data.ts)

Methodological description: Explain causal links between root, leaf, and shoot structure and environmental resources or limitations; compare how different structural solutions affect water balance, access to light, and survival. The central competency is functional explanation rather than merely identifying an adaptation.
User-friendly description: Explain why roots, leaves and shoots have forms suited to different conditions.

##### Describe Seasonal Changes in Plants

Slug: describeSeasonalChangesInPlants
Action: create
Status: implemented

[describeSeasonalChangesInPlants.data.ts](../../data/skills/botany/plantAdaptations/skills/describeSeasonalChangesInPlants.data.ts)

Methodological description: Establish the relationship between changes in day length or temperature and leaf fall, dormancy, or resumption of growth.
User-friendly description: Connect seasonal changes in plants with temperature and daylight.

### Zoology

Slug: zoology
Action: create
Status: implemented

Groups: 4 · Skills: 28

[zoology.data.ts](../../data/skills/zoology/zoology.data.ts)

Methodological description: Comparison of major animal groups, relationships between structure and function, feeding patterns, development, and behavior. Food chains and interspecies networks as whole systems belong to Ecology.
User-friendly description: Discover how animals differ in structure, movement, growth and behavior.

#### Animal Diversity

Slug: animalDiversity
Action: create
Status: implemented

Skills: 17

[animalDiversity.data.ts](../../data/skills/zoology/animalDiversity/animalDiversity.data.ts)

Methodological description: Identifying major animal groups requires diagnostic characteristics, including skeletal structure, body coverings, limbs, and developmental patterns, rather than incidental external resemblance.
User-friendly description: Recognize major animal groups by reliable body features rather than superficial similarities.

##### Recognize Common Local Animals

Slug: recognizeCommonLocalAnimals
Action: create
Status: implemented

[recognizeCommonLocalAnimals.data.ts](../../data/skills/zoology/animalDiversity/skills/recognizeCommonLocalAnimals.data.ts)

Methodological description: Identify familiar local species from a characteristic combination of body structure, coverings, and modes of movement.
User-friendly description: Identify familiar animals using characteristic body structures and coverings.

##### Distinguish Vertebrates and Invertebrates

Slug: distinguishVertebratesAndInvertebrates
Action: create
Status: implemented

[distinguishVertebratesAndInvertebrates.data.ts](../../data/skills/zoology/animalDiversity/skills/distinguishVertebratesAndInvertebrates.data.ts)

Methodological description: Use the presence of a vertebral column as the anatomical dividing line between these two broad groups.
User-friendly description: Distinguish animals with a backbone from those without one.

##### Recognize Insect Characteristics

Slug: recognizeInsectCharacteristics
Action: create
Status: implemented

[recognizeInsectCharacteristics.data.ts](../../data/skills/zoology/animalDiversity/skills/recognizeInsectCharacteristics.data.ts)

Methodological description: Identify six legs, three main body regions, and other characteristic features of adult insects.
User-friendly description: Recognize insects by their six legs and three main body regions.

##### Recognize Arachnid Characteristics

Slug: recognizeArachnidCharacteristics
Action: create
Status: implemented

[recognizeArachnidCharacteristics.data.ts](../../data/skills/zoology/animalDiversity/skills/recognizeArachnidCharacteristics.data.ts)

Methodological description: Recognize arthropods with characteristic chelicerae and usually four pairs of walking legs in adults; distinguish spiders, ticks and mites, and scorpions from insects.
User-friendly description: Recognize spiders and other arachnids by their distinctive body features.

##### Recognize Crustacean Characteristics

Slug: recognizeCrustaceanCharacteristics
Action: create
Status: implemented

[recognizeCrustaceanCharacteristics.data.ts](../../data/skills/zoology/animalDiversity/skills/recognizeCrustaceanCharacteristics.data.ts)

Methodological description: Recognize diverse crustaceans by jointed appendages, antennae, and characteristic structural traits; do not treat ten legs as a universal characteristic of crustaceans.
User-friendly description: Recognize the varied structures of crustaceans without assuming all have ten legs.

##### Recognize Mollusc Characteristics

Slug: recognizeMolluscCharacteristics
Action: create
Status: implemented

[recognizeMolluscCharacteristics.data.ts](../../data/skills/zoology/animalDiversity/skills/recognizeMolluscCharacteristics.data.ts)

Methodological description: Identify the soft body, mantle, and other characteristic features of gastropods, bivalves, and cephalopods, taking into account that not all molluscs have an external shell.
User-friendly description: Identify molluscs by their characteristic soft bodies and other structures.

##### Recognize Annelid Characteristics

Slug: recognizeAnnelidCharacteristics
Action: create
Status: implemented

[recognizeAnnelidCharacteristics.data.ts](../../data/skills/zoology/animalDiversity/skills/recognizeAnnelidCharacteristics.data.ts)

Methodological description: Recognize the segmented body of annelids and distinguish them from nematodes and flatworms, even where all these animals have similarly elongated bodies.
User-friendly description: Recognize segmented worms and distinguish them from other worm-shaped animals.

##### Recognize Flatworm Characteristics

Slug: recognizeFlatwormCharacteristics
Action: create
Status: implemented

[recognizeFlatwormCharacteristics.data.ts](../../data/skills/zoology/animalDiversity/skills/recognizeFlatwormCharacteristics.data.ts)

Methodological description: Identify the flattened body and other features of flatworms, including free-living and parasitic forms, without confusing them with annelids.
User-friendly description: Recognize flatworms and distinguish them from segmented worms.

##### Recognize Nematode Characteristics

Slug: recognizeNematodeCharacteristics
Action: create
Status: implemented

[recognizeNematodeCharacteristics.data.ts](../../data/skills/zoology/animalDiversity/skills/recognizeNematodeCharacteristics.data.ts)

Methodological description: Recognize the unsegmented elongated bodies of roundworms and features of their lifestyles, including free-living and parasitic forms.
User-friendly description: Recognize roundworms by their unsegmented bodies and other traits.

##### Recognize Cnidarian Characteristics

Slug: recognizeCnidarianCharacteristics
Action: create
Status: implemented

[recognizeCnidarianCharacteristics.data.ts](../../data/skills/zoology/animalDiversity/skills/recognizeCnidarianCharacteristics.data.ts)

Methodological description: Recognize cnidarians by stinging cells and the characteristic body plans of polyps and medusae; do not regard the medusa form as obligatory for every member.
User-friendly description: Recognize animals such as jellyfish and corals by their stinging cells.

##### Recognize Echinoderm Characteristics

Slug: recognizeEchinodermCharacteristics
Action: create
Status: implemented

[recognizeEchinodermCharacteristics.data.ts](../../data/skills/zoology/animalDiversity/skills/recognizeEchinodermCharacteristics.data.ts)

Methodological description: Identify marine invertebrates with a water vascular system and characteristic adult symmetry, distinguishing sea stars, sea urchins, and other representatives.
User-friendly description: Identify sea stars and other echinoderms by their distinctive structures.

##### Recognize Sponge Characteristics

Slug: recognizeSpongeCharacteristics
Action: create
Status: implemented

[recognizeSpongeCharacteristics.data.ts](../../data/skills/zoology/animalDiversity/skills/recognizeSpongeCharacteristics.data.ts)

Methodological description: Recognize the porous body structure and filter-feeding of sponges, explaining that they lack true tissues and organs.
User-friendly description: Recognize sponges by their porous bodies and filter-feeding.

##### Recognize Fish Characteristics

Slug: recognizeFishCharacteristics
Action: create
Status: implemented

[recognizeFishCharacteristics.data.ts](../../data/skills/zoology/animalDiversity/skills/recognizeFishCharacteristics.data.ts)

Methodological description: Identify typical traits of aquatic vertebrates with gill respiration and fins while accounting for the diversity of fish.
User-friendly description: Identify typical features of fish while recognizing their diversity.

##### Recognize Amphibian Characteristics

Slug: recognizeAmphibianCharacteristics
Action: create
Status: implemented

[recognizeAmphibianCharacteristics.data.ts](../../data/skills/zoology/animalDiversity/skills/recognizeAmphibianCharacteristics.data.ts)

Methodological description: Identify characteristic features of a group in which development is often associated with water and adults may use lungs and skin for respiration.
User-friendly description: Recognize common features of amphibians and their development.

##### Recognize Reptile Characteristics

Slug: recognizeReptileCharacteristics
Action: create
Status: implemented

[recognizeReptileCharacteristics.data.ts](../../data/skills/zoology/animalDiversity/skills/recognizeReptileCharacteristics.data.ts)

Methodological description: Identify members by characteristics of scaled skin and reproductive features of terrestrial amniotes.
User-friendly description: Identify reptile characteristics, including skin and reproduction.

##### Recognize Bird Characteristics

Slug: recognizeBirdCharacteristics
Action: create
Status: implemented

[recognizeBirdCharacteristics.data.ts](../../data/skills/zoology/animalDiversity/skills/recognizeBirdCharacteristics.data.ts)

Methodological description: Use feathers as the primary diagnostic characteristic of birds, regardless of their ability to fly.
User-friendly description: Recognize birds by their feathers, even when they cannot fly.

##### Recognize Mammal Characteristics

Slug: recognizeMammalCharacteristics
Action: create
Status: implemented

[recognizeMammalCharacteristics.data.ts](../../data/skills/zoology/animalDiversity/skills/recognizeMammalCharacteristics.data.ts)

Methodological description: Identify members by mammary glands and characteristic body coverings without assuming that every mammal gives birth to live young.
User-friendly description: Identify mammals by their defining features without assuming all give live birth.

#### Structure and Functions

Slug: structureAndFunctions
Action: create
Status: implemented

Skills: 4

[structureAndFunctions.data.ts](../../data/skills/zoology/structureAndFunctions/structureAndFunctions.data.ts)

Methodological description: The forms of limbs, body coverings, and sensory structures are explained by their roles in locomotion, orientation, and protection against danger.
User-friendly description: Explore how animal structures help them move, sense and protect themselves.

##### Relate Limb Structure to Locomotion

Slug: relateLimbStructureToLocomotion
Action: create
Status: implemented

[relateLimbStructureToLocomotion.data.ts](../../data/skills/zoology/structureAndFunctions/skills/relateLimbStructureToLocomotion.data.ts)

Methodological description: Relate the shape of legs, fins, or wings to the requirements of walking, swimming, digging, or flying.
User-friendly description: Connect the shapes of limbs with walking, swimming, digging or flying.

##### Relate Body Coverings to Their Functions

Slug: relateBodyCoveringsToTheirFunctions
Action: create
Status: implemented

[relateBodyCoveringsToTheirFunctions.data.ts](../../data/skills/zoology/structureAndFunctions/skills/relateBodyCoveringsToTheirFunctions.data.ts)

Methodological description: Explain how feathers, fur, scales, and skin provide protection, thermal insulation, or water balance.
User-friendly description: Explain how fur, feathers, scales and skin protect animal bodies.

##### Explain the Role of Sensory Organs in Behavior

Slug: explainTheRoleOfSensoryOrgansInBehavior
Action: create
Status: implemented

[explainTheRoleOfSensoryOrgansInBehavior.data.ts](../../data/skills/zoology/structureAndFunctions/skills/explainTheRoleOfSensoryOrgansInBehavior.data.ts)

Methodological description: Connect perception of sounds, smells, light, or vibrations with orientation and finding food.
User-friendly description: See how sensory organs help animals find food and orient themselves.

##### Identify Protective Adaptations in Animals

Slug: identifyProtectiveAdaptationsInAnimals
Action: create
Status: implemented

[identifyProtectiveAdaptationsInAnimals.data.ts](../../data/skills/zoology/structureAndFunctions/skills/identifyProtectiveAdaptationsInAnimals.data.ts)

Methodological description: Identify the function of camouflage, shells or armor, spines, and other defensive structures in particular situations.
User-friendly description: Recognize structures that help animals defend themselves.

#### Nutrition and Development

Slug: nutritionAndDevelopment
Action: create
Status: implemented

Skills: 4

[nutritionAndDevelopment.data.ts](../../data/skills/zoology/nutritionAndDevelopment/nutritionAndDevelopment.data.ts)

Methodological description: Food sources differ among animal groups, while their life cycles may involve body transformations or development without a drastic change in form.
User-friendly description: Discover how diets and life cycles differ among animals.

##### Classify Animals by Diet

Slug: classifyAnimalsByDiet
Action: create
Status: implemented

[classifyAnimalsByDiet.data.ts](../../data/skills/zoology/nutritionAndDevelopment/skills/classifyAnimalsByDiet.data.ts)

Methodological description: Classify examples as herbivores, carnivores, or omnivores according to actual diets rather than animal names.
User-friendly description: Classify animals by what they actually eat.

##### Distinguish Juveniles and Adults

Slug: distinguishJuvenilesAndAdults
Action: create
Status: implemented

[distinguishJuvenilesAndAdults.data.ts](../../data/skills/zoology/nutritionAndDevelopment/skills/distinguishJuvenilesAndAdults.data.ts)

Methodological description: Determine an individual’s developmental stage by body proportions, coverings, or reproductive maturity.
User-friendly description: Recognize differences between juvenile and adult animals.

##### Explain Complete Metamorphosis in Insects

Slug: explainCompleteMetamorphosisInInsects
Action: create
Status: implemented

[explainCompleteMetamorphosisInInsects.data.ts](../../data/skills/zoology/nutritionAndDevelopment/skills/explainCompleteMetamorphosisInInsects.data.ts)

Methodological description: Explain the four developmental stages of insects with complete metamorphosis: egg, larva, pupa, and imago; using butterflies, beetles, or flies as examples, distinguish the markedly different functions and structures of larvae and adults.
User-friendly description: Follow the egg, larva, pupa and adult stages of complete insect metamorphosis.

##### Compare Development With and Without Metamorphosis

Slug: compareDevelopmentWithAndWithoutMetamorphosis
Action: create
Status: implemented

[compareDevelopmentWithAndWithoutMetamorphosis.data.ts](../../data/skills/zoology/nutritionAndDevelopment/skills/compareDevelopmentWithAndWithoutMetamorphosis.data.ts)

Methodological description: Compare life cycles involving radical structural change with cycles in which young individuals resemble adults.
User-friendly description: Compare animals that change form during development with those that do not.

#### Behavior

Slug: behavior
Action: create
Status: implemented

Skills: 3

[behavior.data.ts](../../data/skills/zoology/behavior/behavior.data.ts)

Methodological description: Animal actions arise in response to signals and needs; observation makes it possible to identify defense, communication, and benefits of living in groups.
User-friendly description: Explore how animal behavior supports communication, protection and group life.

##### Recognize Defensive Behavior

Slug: recognizeDefensiveBehavior
Action: create
Status: implemented

[recognizeDefensiveBehavior.data.ts](../../data/skills/zoology/behavior/skills/recognizeDefensiveBehavior.data.ts)

Methodological description: Determine whether fleeing, freezing, distraction, or attacking reduces a threat in a given situation.
User-friendly description: Recognize behaviors animals use when threatened.

##### Explain the Role of Signals in Animal Communication

Slug: explainTheRoleOfSignalsInAnimalCommunication
Action: create
Status: implemented

[explainTheRoleOfSignalsInAnimalCommunication.data.ts](../../data/skills/zoology/behavior/skills/explainTheRoleOfSignalsInAnimalCommunication.data.ts)

Methodological description: Relate sound, smell, movement, or coloration to information received by another individual.
User-friendly description: Explain how animals communicate using sounds, movement and other signals.

##### Explain Benefits of Group Behavior

Slug: explainBenefitsOfGroupBehavior
Action: create
Status: implemented

[explainBenefitsOfGroupBehavior.data.ts](../../data/skills/zoology/behavior/skills/explainBenefitsOfGroupBehavior.data.ts)

Methodological description: Explain how cooperative foraging, defense, or care for offspring may improve the success of individuals.
User-friendly description: Discover how group behavior may help animals feed, defend themselves and care for young.

### Mycology

Slug: mycology
Action: create
Status: implemented

Groups: 0 · Skills: 4

[mycology.data.ts](../../data/skills/mycology/mycology.data.ts)

Methodological description: Fungi as a distinct branch of cellular life: nutrition, mycelium, fruiting bodies, and the role of fungi in matter cycling. Microscopic fungi overlap with Microbiology in scale, but their structure and biological characteristics are central here.
User-friendly description: Explore how fungi are structured, obtain nutrients and help recycle matter.

#### Recognize Fungi as a Distinct Group of Organisms

Slug: recognizeFungiAsADistinctGroupOfOrganisms
Action: create
Status: implemented

[recognizeFungiAsADistinctGroupOfOrganisms.data.ts](../../data/skills/mycology/skills/recognizeFungiAsADistinctGroupOfOrganisms.data.ts)

Methodological description: Distinguish fungi, plants, and animals by how they obtain organic substances and by structural characteristics.
User-friendly description: Distinguish fungi from plants and animals using how they feed and how they are built.

#### Identify the Main Parts of a Mushroom Fruiting Body

Slug: identifyTheMainPartsOfAMushroomFruitingBody
Action: create
Status: implemented

[identifyTheMainPartsOfAMushroomFruitingBody.data.ts](../../data/skills/mycology/skills/identifyTheMainPartsOfAMushroomFruitingBody.data.ts)

Methodological description: Locate the cap, stalk, and spore-producing structures on a diagram of a typical cap-and-stalk mushroom.
User-friendly description: Identify the cap, stalk and spore-producing structures of a familiar mushroom.

#### Distinguish Mycelium from a Fruiting Body

Slug: distinguishMyceliumFromAFruitingBody
Action: create
Status: implemented

[distinguishMyceliumFromAFruitingBody.data.ts](../../data/skills/mycology/skills/distinguishMyceliumFromAFruitingBody.data.ts)

Methodological description: Explain why an underground or concealed network of hyphae forms the main body of many fungi, while the visible mushroom cap is only a reproductive structure.
User-friendly description: Discover how a fungus's hidden mycelium differs from its visible fruiting body.

#### Explain the Role of Fungi in Decomposing Organic Remains

Slug: explainTheRoleOfFungiInDecomposingOrganicRemains
Action: create
Status: implemented

[explainTheRoleOfFungiInDecomposingOrganicRemains.data.ts](../../data/skills/mycology/skills/explainTheRoleOfFungiInDecomposingOrganicRemains.data.ts)

Methodological description: Relate enzymes secreted by fungi to the breakdown of remains and the reuse of substances in an ecosystem.
User-friendly description: Explain how fungi break down organic remains and return materials to ecosystems.

### Microbiology

Slug: microbiology
Action: create
Status: implemented

Groups: 0 · Skills: 9

[microbiology.data.ts](../../data/skills/microbiology/microbiology.data.ts)

Methodological description: Microscopic cellular life forms and their processes, including bacteria, fermentation, decomposition, and interactions with the human body. Microscopic size does not define a single taxon; this Domain considers the shared context of microbial processes.
User-friendly description: Discover the diversity of microscopic cellular life and its roles in nature and human activities.

#### Recognize Microorganisms from Descriptions

Slug: recognizeMicroorganismsFromDescriptions
Action: create
Status: implemented

[recognizeMicroorganismsFromDescriptions.data.ts](../../data/skills/microbiology/skills/recognizeMicroorganismsFromDescriptions.data.ts)

Methodological description: Distinguish microscopic scale from taxonomic membership: bacteria, unicellular eukaryotes, and other organisms may all be very small.
User-friendly description: Recognize that many different kinds of living things can be microscopic.

#### Distinguish Bacteria and Archaea

Slug: distinguishBacteriaAndArchaea
Action: create
Status: implemented

[distinguishBacteriaAndArchaea.data.ts](../../data/skills/microbiology/skills/distinguishBacteriaAndArchaea.data.ts)

Methodological description: Explain that bacteria and archaea are separate evolutionary lineages of cellular organisms without a membrane-bound nucleus; molecular structural differences, including membrane lipids and cell envelopes, cannot be reduced to external cell shape.
User-friendly description: Distinguish bacteria and archaea as different groups of cellular organisms.

#### Recognize Microscopic Eukaryotes

Slug: recognizeMicroscopicEukaryotes
Action: create
Status: implemented

[recognizeMicroscopicEukaryotes.data.ts](../../data/skills/microbiology/skills/recognizeMicroscopicEukaryotes.data.ts)

Methodological description: Recognize nucleated unicellular eukaryotes, including diverse protists, algae, and yeasts; do not treat 'microorganisms' as a single biological taxon.
User-friendly description: Recognize microscopic organisms whose cells contain nuclei.

#### Explain Prokaryotic Cell Structure

Slug: explainProkaryoticCellStructure
Action: create
Status: implemented

[explainProkaryoticCellStructure.data.ts](../../data/skills/microbiology/skills/explainProkaryoticCellStructure.data.ts)

Methodological description: Explain the organization of bacterial and archaeal cells without a membrane-bound nucleus and the roles of the membrane, cytoplasm, genetic material, and ribosomes; distinguish prokaryotic from eukaryotic cell organization.
User-friendly description: Explore how bacterial and archaeal cells function without a membrane-bound nucleus.

#### Explain Bacterial Cell Division

Slug: explainBacterialCellDivision
Action: create
Status: implemented

[explainBacterialCellDivision.data.ts](../../data/skills/microbiology/skills/explainBacterialCellDivision.data.ts)

Methodological description: Explain bacterial binary fission through replication of genetic material and formation of daughter cells, without confusing it with eukaryotic mitosis.
User-friendly description: Explain how bacterial cells reproduce by dividing in two.

#### Identify Bacterial Habitats

Slug: identifyBacterialHabitats
Action: create
Status: implemented

[identifyBacterialHabitats.data.ts](../../data/skills/microbiology/skills/identifyBacterialHabitats.data.ts)

Methodological description: Use examples to explain why bacteria occur in soil, water, organisms, and even extreme environments.
User-friendly description: Discover why bacteria can live in many kinds of environments.

#### Explain the Role of Microorganisms in Fermentation

Slug: explainTheRoleOfMicroorganismsInFermentation
Action: create
Status: implemented

[explainTheRoleOfMicroorganismsInFermentation.data.ts](../../data/skills/microbiology/skills/explainTheRoleOfMicroorganismsInFermentation.data.ts)

Methodological description: Relate microbial transformations of sugars to the production of new products in food technologies.
User-friendly description: Explain how microorganisms transform ingredients during fermentation.

#### Explain Their Role in Decomposition

Slug: explainTheirRoleInDecomposition
Action: create
Status: implemented

[explainTheirRoleInDecomposition.data.ts](../../data/skills/microbiology/skills/explainTheirRoleInDecomposition.data.ts)

Methodological description: Show how bacteria and other microorganisms break down organic residues and return substances to circulation.
User-friendly description: Explore how microscopic organisms break down dead organic matter.

#### Distinguish Beneficial and Harmful Microbial Interactions with Humans

Slug: distinguishBeneficialAndHarmfulMicrobialInteractionsWithHumans
Action: create
Status: implemented

[distinguishBeneficialAndHarmfulMicrobialInteractionsWithHumans.data.ts](../../data/skills/microbiology/skills/distinguishBeneficialAndHarmfulMicrobialInteractionsWithHumans.data.ts)

Methodological description: Distinguish normal, beneficial, and potentially disease-causing interactions according to the microorganism, host, and conditions.
User-friendly description: Distinguish helpful, harmless and harmful interactions between microbes and people.

### Virology

Slug: virology
Action: create
Status: implemented

Groups: 0 · Skills: 3

[virology.data.ts](../../data/skills/virology/virology.data.ts)

Methodological description: Viruses as noncellular infectious agents: structure, reproduction inside host cells, and routes of transmission. They are not cellular organisms, although they are studied alongside them.
User-friendly description: Explore what viruses are, how they reproduce in host cells and how they spread.

#### Explain What a Virus Is

Slug: explainWhatAVirusIs
Action: create
Status: implemented

[explainWhatAVirusIs.data.ts](../../data/skills/virology/skills/explainWhatAVirusIs.data.ts)

Methodological description: Explain that a virus is a noncellular infectious agent containing genetic material; it lacks its own protein-synthesis machinery and reproduces using a host cell.
User-friendly description: Explain why viruses need living cells to make more viruses.

#### Distinguish a Virus from a Cellular Organism

Slug: distinguishAVirusFromACellularOrganism
Action: create
Status: implemented

[distinguishAVirusFromACellularOrganism.data.ts](../../data/skills/virology/skills/distinguishAVirusFromACellularOrganism.data.ts)

Methodological description: Compare cellular organisms' cell membranes, cytoplasm, and independent metabolism with the absence of this cellular organization in a virus particle.
User-friendly description: Understand how viruses differ from organisms made of cells.

#### Explain Mechanisms of Viral Transmission

Slug: explainMechanismsOfViralTransmission
Action: create
Status: implemented

[explainMechanismsOfViralTransmission.data.ts](../../data/skills/virology/skills/explainMechanismsOfViralTransmission.data.ts)

Methodological description: Explain how viruses spread between hosts by different routes, including respiratory particles, contact, biological fluids, vectors, and other mechanisms, and why a particular route depends on the characteristics of the virus and its hosts.
User-friendly description: Compare the different routes by which viruses can pass between hosts.

### Human Anatomy and Physiology

Slug: humanAnatomyAndPhysiology
Action: create
Status: implemented

Groups: 6 · Skills: 24

[humanAnatomyAndPhysiology.data.ts](../../data/skills/humanAnatomyAndPhysiology/humanAnatomyAndPhysiology.data.ts)

Methodological description: The structure of the body, organ functions, and interactions among systems that allow humans to move, perceive, breathe, and sustain life. Rules of hygiene, first aid, and safe behavior belong to a separate textbook.
User-friendly description: Explore how the structures and systems of the human body work together to sustain life.

#### Body Structure

Slug: bodyStructure
Action: create
Status: implemented

Skills: 3

[bodyStructure.data.ts](../../data/skills/humanAnatomyAndPhysiology/bodyStructure/bodyStructure.data.ts)

Methodological description: External and internal body parts form organs and systems, each performing a particular function in the organism.
User-friendly description: Learn how body parts, organs and systems fit together.

##### Identify Major Body Parts

Slug: identifyMajorBodyParts
Action: create
Status: implemented

[identifyMajorBodyParts.data.ts](../../data/skills/humanAnatomyAndPhysiology/bodyStructure/skills/identifyMajorBodyParts.data.ts)

Methodological description: Locate the head, trunk, limbs, and important external structures on a model of the human body.
User-friendly description: Recognize the major external parts of the human body.

##### Relate Organs to Their Functions

Slug: relateOrgansToTheirFunctions
Action: create
Status: implemented

[relateOrgansToTheirFunctions.data.ts](../../data/skills/humanAnatomyAndPhysiology/bodyStructure/skills/relateOrgansToTheirFunctions.data.ts)

Methodological description: Associate the lungs with gas exchange, the heart with blood movement, and the stomach and intestines with food processing.
User-friendly description: Connect organs such as the lungs, heart and intestines with their functions.

##### Distinguish an Organ from an Organ System

Slug: distinguishAnOrganFromAnOrganSystem
Action: create
Status: implemented

[distinguishAnOrganFromAnOrganSystem.data.ts](../../data/skills/humanAnatomyAndPhysiology/bodyStructure/skills/distinguishAnOrganFromAnOrganSystem.data.ts)

Methodological description: Distinguish a single anatomical structure from a functional association of several organs.
User-friendly description: Distinguish an individual organ from a system of cooperating organs.

#### Sensory Organs and the Nervous System

Slug: sensoryOrgansAndTheNervousSystem
Action: create
Status: implemented

Skills: 4

[sensoryOrgansAndTheNervousSystem.data.ts](../../data/skills/humanAnatomyAndPhysiology/sensoryOrgansAndTheNervousSystem/sensoryOrgansAndTheNervousSystem.data.ts)

Methodological description: Receptors detect different stimuli, the nervous system processes signals, and the skin also protects the body as a physical barrier.
User-friendly description: Discover how senses and nerves detect and respond to information.

##### Relate a Sense Organ to the Information It Detects

Slug: relateASenseOrganToTheInformationItDetects
Action: create
Status: implemented

[relateASenseOrganToTheInformationItDetects.data.ts](../../data/skills/humanAnatomyAndPhysiology/sensoryOrgansAndTheNervousSystem/skills/relateASenseOrganToTheInformationItDetects.data.ts)

Methodological description: Relate light, sound, smell, taste, and touch to receptors capable of detecting those signals.
User-friendly description: Match each sense organ with the kinds of information it can detect.

##### Explain Responses to Stimuli

Slug: explainResponsesToStimuli
Action: create
Status: implemented

[explainResponsesToStimuli.data.ts](../../data/skills/humanAnatomyAndPhysiology/sensoryOrgansAndTheNervousSystem/skills/explainResponsesToStimuli.data.ts)

Methodological description: Explain how a sensory signal can trigger a muscle response or a change in behavior.
User-friendly description: Explore how sensed information can lead to movement or changes in behavior.

##### Recognize the Brain’s Role in Perception

Slug: recognizeTheBrainsRoleInPerception
Action: create
Status: implemented

[recognizeTheBrainsRoleInPerception.data.ts](../../data/skills/humanAnatomyAndPhysiology/sensoryOrgansAndTheNervousSystem/skills/recognizeTheBrainsRoleInPerception.data.ts)

Methodological description: Understand that nerve signals from the sense organs are processed in the brain rather than being turned into conscious sensations by the eyes or ears themselves.
User-friendly description: Explain why the brain plays a central role in interpreting sensory information.

##### Identify the Skin’s Protective Function

Slug: identifyTheSkinsProtectiveFunction
Action: create
Status: implemented

[identifyTheSkinsProtectiveFunction.data.ts](../../data/skills/humanAnatomyAndPhysiology/sensoryOrgansAndTheNervousSystem/skills/identifyTheSkinsProtectiveFunction.data.ts)

Methodological description: Explain how intact skin reduces water loss and the penetration of harmful agents.
User-friendly description: Discover how healthy skin helps protect the body and retain moisture.

#### Support and Movement

Slug: supportAndMovement
Action: create
Status: implemented

Skills: 3

[supportAndMovement.data.ts](../../data/skills/humanAnatomyAndPhysiology/supportAndMovement/supportAndMovement.data.ts)

Methodological description: Bones provide support and levers, muscles exert force, and joints determine the possible directions of movement.
User-friendly description: Explore how bones, muscles and joints work together in movement.

##### Explain the Role of the Skeleton

Slug: explainTheRoleOfTheSkeleton
Action: create
Status: implemented

[explainTheRoleOfTheSkeleton.data.ts](../../data/skills/humanAnatomyAndPhysiology/supportAndMovement/skills/explainTheRoleOfTheSkeleton.data.ts)

Methodological description: Show how bones maintain body shape and provide some protection to internal organs.
User-friendly description: Explain how the skeleton supports the body and protects some organs.

##### Explain the Role of Muscles in Movement

Slug: explainTheRoleOfMusclesInMovement
Action: create
Status: implemented

[explainTheRoleOfMusclesInMovement.data.ts](../../data/skills/humanAnatomyAndPhysiology/supportAndMovement/skills/explainTheRoleOfMusclesInMovement.data.ts)

Methodological description: Relate contraction of muscle tissue to the generation of force that changes the positions of body parts.
User-friendly description: Connect muscle contractions with the forces needed to move.

##### Describe Interactions Between Bones and Muscles

Slug: describeInteractionsBetweenBonesAndMuscles
Action: create
Status: implemented

[describeInteractionsBetweenBonesAndMuscles.data.ts](../../data/skills/humanAnatomyAndPhysiology/supportAndMovement/skills/describeInteractionsBetweenBonesAndMuscles.data.ts)

Methodological description: Explain movement at a joint through muscle attachments to bones and the interaction of muscles acting in opposite directions.
User-friendly description: Understand how muscles pull on bones to move joints.

#### Maintaining Life Processes

Slug: maintainingLifeProcesses
Action: create
Status: implemented

Skills: 8

[maintainingLifeProcesses.data.ts](../../data/skills/humanAnatomyAndPhysiology/maintainingLifeProcesses/maintainingLifeProcesses.data.ts)

Methodological description: Nutrients, oxygen, and blood travel along different pathways; their coordinated operation provides cells with resources.
User-friendly description: Investigate how digestion, breathing and circulation supply the body's cells.

##### Explain the Passage of Food Through the Digestive System

Slug: explainThePassageOfFoodThroughTheDigestiveSystem
Action: create
Status: implemented

[explainThePassageOfFoodThroughTheDigestiveSystem.data.ts](../../data/skills/humanAnatomyAndPhysiology/maintainingLifeProcesses/skills/explainThePassageOfFoodThroughTheDigestiveSystem.data.ts)

Methodological description: Explain the sequential passage of food through the mouth, esophagus, stomach, and intestines, the role of peristalsis, and the difference between food movement, digestion, and nutrient absorption.
User-friendly description: Follow the path food travels through the digestive tract and distinguish its different functions.

##### Explain Lung Ventilation

Slug: explainLungVentilation
Action: create
Status: implemented

[explainLungVentilation.data.ts](../../data/skills/humanAnatomyAndPhysiology/maintainingLifeProcesses/skills/explainLungVentilation.data.ts)

Methodological description: Explain inhalation and exhalation as air movement caused by respiratory muscle activity, changes in thoracic cavity volume, and pressure differences; distinguish ventilation from alveolar gas exchange and cellular respiration.
User-friendly description: Explain how breathing muscles move air into and out of the lungs.

##### Explain Digestion of Nutrients

Slug: explainDigestionOfNutrients
Action: create
Status: implemented

[explainDigestionOfNutrients.data.ts](../../data/skills/humanAnatomyAndPhysiology/maintainingLifeProcesses/skills/explainDigestionOfNutrients.data.ts)

Methodological description: Explain the mechanical and enzymatic processing of food in the digestive tract and the role of digestive juices in breaking large molecules into components available for absorption.
User-friendly description: Discover how digestive processes break food into smaller usable substances.

##### Explain Nutrient Absorption

Slug: explainNutrientAbsorption
Action: create
Status: implemented

[explainNutrientAbsorption.data.ts](../../data/skills/humanAnatomyAndPhysiology/maintainingLifeProcesses/skills/explainNutrientAbsorption.data.ts)

Methodological description: Explain how digestive products pass through the intestinal epithelium into blood and lymph; distinguish chemical digestion from transport of already broken-down nutrients.
User-friendly description: Learn how digested nutrients move from the intestine into the body.

##### Explain the Role of the Kidneys in Excretion

Slug: explainTheRoleOfTheKidneysInExcretion
Action: create
Status: implemented

[explainTheRoleOfTheKidneysInExcretion.data.ts](../../data/skills/humanAnatomyAndPhysiology/maintainingLifeProcesses/skills/explainTheRoleOfTheKidneysInExcretion.data.ts)

Methodological description: Explain blood filtration, selective reabsorption of water and needed substances, and urine formation as means of removing metabolic waste and maintaining the internal environment.
User-friendly description: Explain how kidneys filter blood and help maintain the body's internal balance.

##### Explain Gas Exchange in the Lungs

Slug: explainGasExchangeInTheLungs
Action: create
Status: implemented

[explainGasExchangeInTheLungs.data.ts](../../data/skills/humanAnatomyAndPhysiology/maintainingLifeProcesses/skills/explainGasExchangeInTheLungs.data.ts)

Methodological description: Explain the exchange of oxygen and carbon dioxide between the alveoli and blood.
User-friendly description: Understand how oxygen and carbon dioxide move between lung air spaces and blood.

##### Explain the Heart’s Role in Circulation

Slug: explainTheHeartsRoleInCirculation
Action: create
Status: implemented

[explainTheHeartsRoleInCirculation.data.ts](../../data/skills/humanAnatomyAndPhysiology/maintainingLifeProcesses/skills/explainTheHeartsRoleInCirculation.data.ts)

Methodological description: Describe the heart as a pump that drives blood through vessels to organs and back.
User-friendly description: Explore how the heart pumps blood around the body.

##### Identify Breathing Changes During Physical Activity

Slug: identifyBreathingChangesDuringPhysicalActivity
Action: create
Status: implemented

[identifyBreathingChangesDuringPhysicalActivity.data.ts](../../data/skills/humanAnatomyAndPhysiology/maintainingLifeProcesses/skills/identifyBreathingChangesDuringPhysicalActivity.data.ts)

Methodological description: Relate faster and deeper breathing to the increased need of working muscles for oxygen and removal of CO₂.
User-friendly description: Explain why breathing changes during physical activity.

#### Regulation and Homeostasis

Slug: regulationAndHomeostasis
Action: create
Status: implemented

Skills: 2

[regulationAndHomeostasis.data.ts](../../data/skills/humanAnatomyAndPhysiology/regulationAndHomeostasis/regulationAndHomeostasis.data.ts)

Methodological description: Nervous and hormonal signals coordinate organ functions, while feedback mechanisms maintain key internal conditions within viable ranges.
User-friendly description: Discover how hormones, nerves and feedback help regulate body functions.

##### Explain Endocrine Regulation

Slug: explainEndocrineRegulation
Action: create
Status: implemented

[explainEndocrineRegulation.data.ts](../../data/skills/humanAnatomyAndPhysiology/regulationAndHomeostasis/skills/explainEndocrineRegulation.data.ts)

Methodological description: Explain how hormones secreted by endocrine glands affect cells and organs, including metabolism, growth, and responses to environmental changes; compare the duration of hormonal and neural signals without claiming that these always act independently.
User-friendly description: Explore how hormones send signals that affect growth and other body processes.

##### Explain Maintenance of Homeostasis

Slug: explainMaintenanceOfHomeostasis
Action: create
Status: implemented

[explainMaintenanceOfHomeostasis.data.ts](../../data/skills/humanAnatomyAndPhysiology/regulationAndHomeostasis/skills/explainMaintenanceOfHomeostasis.data.ts)

Methodological description: Explain how temperature, water balance, and blood glucose are maintained through regulation and negative feedback; distinguish dynamic stability of the internal environment from a total absence of change.
User-friendly description: Understand how the body keeps internal conditions within workable ranges.

#### Development and Protection of the Organism

Slug: developmentAndProtectionOfTheOrganism
Action: create
Status: implemented

Skills: 4

[developmentAndProtectionOfTheOrganism.data.ts](../../data/skills/humanAnatomyAndPhysiology/developmentAndProtectionOfTheOrganism/developmentAndProtectionOfTheOrganism.data.ts)

Methodological description: Changes from childhood to adulthood, immune mechanisms, and physiological recovery help maintain bodily functions over time.
User-friendly description: Explore how development, immune defenses and recovery help sustain the body.

##### Distinguish Stages of Human Development

Slug: distinguishStagesOfHumanDevelopment
Action: create
Status: implemented

[distinguishStagesOfHumanDevelopment.data.ts](../../data/skills/humanAnatomyAndPhysiology/developmentAndProtectionOfTheOrganism/skills/distinguishStagesOfHumanDevelopment.data.ts)

Methodological description: Relate observable growth and pubertal changes to the main stages of human life, without making normative judgments about a 'correct' developmental pace.
User-friendly description: Recognize stages of human development without assuming everyone develops at the same pace.

##### Explain the Immune System’s Protective Role

Slug: explainTheImmuneSystemsProtectiveRole
Action: create
Status: implemented

[explainTheImmuneSystemsProtectiveRole.data.ts](../../data/skills/humanAnatomyAndPhysiology/developmentAndProtectionOfTheOrganism/skills/explainTheImmuneSystemsProtectiveRole.data.ts)

Methodological description: Explain how the body recognizes foreign agents and initiates a protective response without confusing this with absolute protection against disease.
User-friendly description: Explain how the immune system detects and responds to potentially harmful agents.

##### Explain the Importance of Sleep for Recovery

Slug: explainTheImportanceOfSleepForRecovery
Action: create
Status: implemented

[explainTheImportanceOfSleepForRecovery.data.ts](../../data/skills/humanAnatomyAndPhysiology/developmentAndProtectionOfTheOrganism/skills/explainTheImportanceOfSleepForRecovery.data.ts)

Methodological description: Relate sleep to neural regulation, memory, and restoration of functions without replacing explanations of mechanisms with rules about sleep schedules.
User-friendly description: Discover how sleep supports brain function, memory and recovery.

##### Explain Functions of the Human Reproductive System

Slug: explainFunctionsOfTheHumanReproductiveSystem
Action: create
Status: implemented

[explainFunctionsOfTheHumanReproductiveSystem.data.ts](../../data/skills/humanAnatomyAndPhysiology/developmentAndProtectionOfTheOrganism/skills/explainFunctionsOfTheHumanReproductiveSystem.data.ts)

Methodological description: Explain the biological functions of reproductive organs, production of sex cells, and the role of fertilization in human sexual reproduction, distinguishing physiological facts from individual differences in development.
User-friendly description: Understand the biological functions of human reproductive organs and processes.

### Ecology

Slug: ecology
Action: create
Status: implemented

Groups: 4 · Skills: 20

[ecology.data.ts](../../data/skills/ecology/ecology.data.ts)

Methodological description: Dependencies among organisms, populations, nonliving factors, and flows of matter and energy, together with the consequences of disrupted relationships. The geographical distribution of natural zones and climate processes belongs to Geography.
User-friendly description: Explore how organisms depend on one another and on their environments.

#### Habitats

Slug: habitats
Action: create
Status: implemented

Skills: 4

[habitats.data.ts](../../data/skills/ecology/habitats/habitats.data.ts)

Methodological description: Temperature, water, light, other organisms, and resources affect the survival prospects of a particular species.
User-friendly description: Discover how environmental conditions shape the lives of organisms.

##### Identify an Organism’s Habitat

Slug: identifyAnOrganismsHabitat
Action: create
Status: implemented

[identifyAnOrganismsHabitat.data.ts](../../data/skills/ecology/habitats/skills/identifyAnOrganismsHabitat.data.ts)

Methodological description: Describe typical conditions in which a species finds essential resources and can reproduce.
User-friendly description: Identify the conditions and resources a species needs in its habitat.

##### Relate Organism Structure to Environmental Conditions

Slug: relateOrganismStructureToEnvironmentalConditions
Action: create
Status: implemented

[relateOrganismStructureToEnvironmentalConditions.data.ts](../../data/skills/ecology/habitats/skills/relateOrganismStructureToEnvironmentalConditions.data.ts)

Methodological description: Explain, at the level of ecological niches, how organisms’ structures affect resource use and survival under particular environmental factors. Unlike botanical analysis of individual plant organs, this competency assesses how an organism fits its environment and ecological role.
User-friendly description: Explain how an organism's structure helps it survive and use resources in its environment.

##### Identify Biotic and Abiotic Factors

Slug: identifyBioticAndAbioticFactors
Action: create
Status: implemented

[identifyBioticAndAbioticFactors.data.ts](../../data/skills/ecology/habitats/skills/identifyBioticAndAbioticFactors.data.ts)

Methodological description: Distinguish influences from other organisms from influences of water, light, soil, or temperature.
User-friendly description: Distinguish living influences from nonliving environmental factors.

##### Predict an Organism’s Response to Environmental Change

Slug: predictAnOrganismsResponseToEnvironmentalChange
Action: create
Status: implemented

[predictAnOrganismsResponseToEnvironmentalChange.data.ts](../../data/skills/ecology/habitats/skills/predictAnOrganismsResponseToEnvironmentalChange.data.ts)

Methodological description: Predict how a change in available resources or temperature will alter the behavior, growth, or survival of a species.
User-friendly description: Predict how changing resources or temperature could affect a species.

#### Feeding Relationships

Slug: feedingRelationships
Action: create
Status: implemented

Skills: 5

[feedingRelationships.data.ts](../../data/skills/ecology/feedingRelationships/feedingRelationships.data.ts)

Methodological description: Matter and energy pass between organisms, and decomposers return matter to the environment; a disrupted relationship affects subsequent links.
User-friendly description: Explore how food relationships transfer matter and energy through ecosystems.

##### Distinguish Producers and Consumers

Slug: distinguishProducersAndConsumers
Action: create
Status: implemented

[distinguishProducersAndConsumers.data.ts](../../data/skills/ecology/feedingRelationships/skills/distinguishProducersAndConsumers.data.ts)

Methodological description: Determine which organisms produce organic substances from inorganic ones and which obtain them by consuming other organisms.
User-friendly description: Recognize producers and consumers by how they obtain organic substances.

##### Recognize Decomposers

Slug: recognizeDecomposers
Action: create
Status: implemented

[recognizeDecomposers.data.ts](../../data/skills/ecology/feedingRelationships/skills/recognizeDecomposers.data.ts)

Methodological description: Identify the role of bacteria, fungi, and other decomposers in transforming dead organic remains.
User-friendly description: Identify how decomposers break down organic material.

##### Construct a Simple Food Chain

Slug: constructASimpleFoodChain
Action: create
Status: implemented

[constructASimpleFoodChain.data.ts](../../data/skills/ecology/feedingRelationships/skills/constructASimpleFoodChain.data.ts)

Methodological description: Correctly arrange the direction of matter and energy transfer between a producer and consumers.
User-friendly description: Build a food chain showing who obtains energy and matter from whom.

##### Explain Food Webs

Slug: explainFoodWebs
Action: create
Status: implemented

[explainFoodWebs.data.ts](../../data/skills/ecology/feedingRelationships/skills/explainFoodWebs.data.ts)

Methodological description: Explain how interconnected food chains form a network with several food sources for one species and multiple paths for matter and energy transfer; distinguish a web from a single linear chain.
User-friendly description: Understand how connected food chains form a food web.

##### Explain Energy Flow in an Ecosystem

Slug: explainEnergyFlowInAnEcosystem
Action: create
Status: implemented

[explainEnergyFlowInAnEcosystem.data.ts](../../data/skills/ecology/feedingRelationships/skills/explainEnergyFlowInAnEcosystem.data.ts)

Methodological description: Explain one-way energy transfer through producers, consumers, and decomposers, energy transformations, and dissipation as heat; do not confuse energy flow with matter cycling.
User-friendly description: Explain why energy moves through an ecosystem while matter is reused.

#### Interactions Among Organisms

Slug: interactionsAmongOrganisms
Action: create
Status: implemented

Skills: 4

[interactionsAmongOrganisms.data.ts](../../data/skills/ecology/interactionsAmongOrganisms/interactionsAmongOrganisms.data.ts)

Methodological description: Organisms may use one another as resources, compete, or benefit one another; the nature of an interaction is determined by its consequences for those involved.
User-friendly description: Explore how organisms compete, feed on one another or cooperate.

##### Recognize Predation

Slug: recognizePredation
Action: create
Status: implemented

[recognizePredation.data.ts](../../data/skills/ecology/interactionsAmongOrganisms/skills/recognizePredation.data.ts)

Methodological description: Distinguish consumption of one organism by another from competition over a shared resource.
User-friendly description: Recognize when one organism captures and feeds on another.

##### Recognize Competition

Slug: recognizeCompetition
Action: create
Status: implemented

[recognizeCompetition.data.ts](../../data/skills/ecology/interactionsAmongOrganisms/skills/recognizeCompetition.data.ts)

Methodological description: Recognize situations in which limited food, light, or territory reduces resource availability to others.
User-friendly description: Identify examples of organisms competing for limited resources.

##### Recognize Mutually Beneficial Relationships

Slug: recognizeMutuallyBeneficialRelationships
Action: create
Status: implemented

[recognizeMutuallyBeneficialRelationships.data.ts](../../data/skills/ecology/interactionsAmongOrganisms/skills/recognizeMutuallyBeneficialRelationships.data.ts)

Methodological description: Identify interactions that increase the fitness of both species rather than only one.
User-friendly description: Recognize relationships that benefit both species involved.

##### Explain the Role of Pollinators in Species Interactions

Slug: explainTheRoleOfPollinatorsInSpeciesInteractions
Action: create
Status: implemented

[explainTheRoleOfPollinatorsInSpeciesInteractions.data.ts](../../data/skills/ecology/interactionsAmongOrganisms/skills/explainTheRoleOfPollinatorsInSpeciesInteractions.data.ts)

Methodological description: Explain how an animal’s transfer of pollen relates to plant reproduction and to the pollinator’s resources.
User-friendly description: Explain how pollinators and flowering plants depend on one another.

#### Ecosystems and Biodiversity

Slug: ecosystemsAndBiodiversity
Action: create
Status: implemented

Skills: 7

[ecosystemsAndBiodiversity.data.ts](../../data/skills/ecology/ecosystemsAndBiodiversity/ecosystemsAndBiodiversity.data.ts)

Methodological description: Individual organisms, populations, and communities interact with one another and with nonliving factors. Changes in species composition or resource availability can have indirect consequences for an entire ecosystem, making these relationships and the role of biodiversity important to understand.
User-friendly description: Understand how populations, communities and environmental factors form ecosystems.

##### Distinguish an Organism, Population, and Community

Slug: distinguishAnOrganismPopulationAndCommunity
Action: create
Status: implemented

[distinguishAnOrganismPopulationAndCommunity.data.ts](../../data/skills/ecology/ecosystemsAndBiodiversity/skills/distinguishAnOrganismPopulationAndCommunity.data.ts)

Methodological description: Distinguish a single individual from individuals of one species in an area and from a community composed of different species.
User-friendly description: Distinguish an individual organism, a population and a community.

##### Recognize Natural Communities of Ukraine

Slug: recognizeNaturalCommunitiesOfUkraine
Action: create
Status: implemented

[recognizeNaturalCommunitiesOfUkraine.data.ts](../../data/skills/ecology/ecosystemsAndBiodiversity/skills/recognizeNaturalCommunitiesOfUkraine.data.ts)

Methodological description: Identify characteristic combinations of plants, animals, and conditions in Ukrainian forests, steppes, meadows, or bodies of water.
User-friendly description: Recognize characteristic living communities in Ukrainian forests, steppes and waters.

##### Explain the Interdependence of Ecosystem Components

Slug: explainTheInterdependenceOfEcosystemComponents
Action: create
Status: implemented

[explainTheInterdependenceOfEcosystemComponents.data.ts](../../data/skills/ecology/ecosystemsAndBiodiversity/skills/explainTheInterdependenceOfEcosystemComponents.data.ts)

Methodological description: Explain how organisms, populations, and nonliving ecosystem factors are linked by feeding and other interactions: a change in species abundance, disappearance of a predator, arrival of an invasive organism, or shortage of a resource may affect other participants and the system as a whole. Describe both direct and indirect consequences in particular examples without declaring a species 'beneficial' or 'harmful' merely because of what it eats.
User-friendly description: Explore how changes to one part of an ecosystem can affect many others.

##### Explain the Importance of Biodiversity

Slug: explainTheImportanceOfBiodiversity
Action: create
Status: implemented

[explainTheImportanceOfBiodiversity.data.ts](../../data/skills/ecology/ecosystemsAndBiodiversity/skills/explainTheImportanceOfBiodiversity.data.ts)

Methodological description: Explain why a diversity of ecological roles and relationships can support ecosystem resilience in the face of change.
User-friendly description: Explain how biodiversity can help ecosystems respond to change.

##### Identify Threats to Local Species

Slug: identifyThreatsToLocalSpecies
Action: create
Status: implemented

[identifyThreatsToLocalSpecies.data.ts](../../data/skills/ecology/ecosystemsAndBiodiversity/skills/identifyThreatsToLocalSpecies.data.ts)

Methodological description: Distinguish habitat loss, pollution, excessive harvesting or removal, and invasive species as threat factors.
User-friendly description: Identify activities and environmental changes that threaten local species.

##### Justify Protection of Species Listed in Red Data Books

Slug: justifyProtectionOfSpeciesListedInRedDataBooks
Action: create
Status: implemented

[justifyProtectionOfSpeciesListedInRedDataBooks.data.ts](../../data/skills/ecology/ecosystemsAndBiodiversity/skills/justifyProtectionOfSpeciesListedInRedDataBooks.data.ts)

Methodological description: Explain why species listed in national or regional Red Data Books require conservation attention in light of threats and population status. Distinguish the legal and informational status of a particular Red Data Book from the international IUCN Red List: these lists are not equivalent.
User-friendly description: Explain why threatened species listed in Red Data Books need conservation attention.

##### Explain Matter Cycling in Ecosystems

Slug: explainMatterCyclingInEcosystems
Action: create
Status: implemented

[explainMatterCyclingInEcosystems.data.ts](../../data/skills/ecology/ecosystemsAndBiodiversity/skills/explainMatterCyclingInEcosystems.data.ts)

Methodological description: Explain the repeated transfer and reuse of chemical elements and compounds between organisms and the abiotic environment through uptake, feeding, excretion, and decomposition; distinguish cyclical matter movement from one-way energy flow.
User-friendly description: Discover how matter passes between organisms and the nonliving environment.

### Genetics and Evolution

Slug: geneticsAndEvolution
Action: create
Status: implemented

Groups: 3 · Skills: 17

[geneticsAndEvolution.data.ts](../../data/skills/geneticsAndEvolution/geneticsAndEvolution.data.ts)

Methodological description: Transmission of hereditary information, reasons for similarities and differences among offspring, and changes in inherited traits within populations across generations. An individual's growth is not an evolutionary process.
User-friendly description: Explore how inherited information passes between generations and how populations evolve.

#### Reproduction and Traits

Slug: reproductionAndTraits
Action: create
Status: implemented

Skills: 4

[reproductionAndTraits.data.ts](../../data/skills/geneticsAndEvolution/reproductionAndTraits/reproductionAndTraits.data.ts)

Methodological description: Inherited characteristics can recur in offspring, but individuals of one species are not exact copies; reproductive mode affects variation.
User-friendly description: Discover why offspring resemble their relatives but are not always identical.

##### Distinguish Sexual and Asexual Reproduction

Slug: distinguishSexualAndAsexualReproduction
Action: create
Status: implemented

[distinguishSexualAndAsexualReproduction.data.ts](../../data/skills/geneticsAndEvolution/reproductionAndTraits/skills/distinguishSexualAndAsexualReproduction.data.ts)

Methodological description: Distinguish the fusion of sex cells from reproduction without their fusion, regardless of how offspring outwardly appear.
User-friendly description: Distinguish reproduction with sex-cell fusion from reproduction without it.

##### Identify Hereditary Traits in Examples

Slug: identifyHereditaryTraitsInExamples
Action: create
Status: implemented

[identifyHereditaryTraitsInExamples.data.ts](../../data/skills/geneticsAndEvolution/reproductionAndTraits/skills/identifyHereditaryTraitsInExamples.data.ts)

Methodological description: Identify similarities between generations associated with the transmission of genetic information.
User-friendly description: Recognize inherited traits in examples of parents and offspring.

##### Distinguish Hereditary and Acquired Traits

Slug: distinguishHereditaryAndAcquiredTraits
Action: create
Status: implemented

[distinguishHereditaryAndAcquiredTraits.data.ts](../../data/skills/geneticsAndEvolution/reproductionAndTraits/skills/distinguishHereditaryAndAcquiredTraits.data.ts)

Methodological description: Distinguish changes that can be passed to offspring through genetic information from changes acquired by an individual through experience, injury, or training. Explain that most phenotypic traits arise from interactions between genotype and environment, so a rigid binary classification is not universally applicable.
User-friendly description: Explore how genes and environments contribute to traits, without relying on a strict either-or rule.

##### Explain Differences Among Offspring of the Same Species

Slug: explainDifferencesAmongOffspringOfTheSameSpecies
Action: create
Status: implemented

[explainDifferencesAmongOffspringOfTheSameSpecies.data.ts](../../data/skills/geneticsAndEvolution/reproductionAndTraits/skills/explainDifferencesAmongOffspringOfTheSameSpecies.data.ts)

Methodological description: Explain why recombination, mutations, and developmental conditions can produce differences among individuals.
User-friendly description: Explain why individuals of the same species can develop different features.

#### Genetics

Slug: genetics
Action: create
Status: implemented

Skills: 5

[genetics.data.ts](../../data/skills/geneticsAndEvolution/genetics/genetics.data.ts)

Methodological description: Genes, as segments of hereditary information, help explain relatedness and differences; how a trait is expressed also depends on regulation and the environment.
User-friendly description: Learn how DNA, genes and their activity shape inherited characteristics.

##### Recognize DNA’s Role in Storing Hereditary Information

Slug: recognizeDNAsRoleInStoringHereditaryInformation
Action: create
Status: implemented

[recognizeDNAsRoleInStoringHereditaryInformation.data.ts](../../data/skills/geneticsAndEvolution/genetics/skills/recognizeDNAsRoleInStoringHereditaryInformation.data.ts)

Methodological description: Explain the role of DNA sequences in storing information about the construction and regulation of cellular structures.
User-friendly description: Explain how DNA stores information used by living cells.

##### Explain Transmission of Hereditary Information

Slug: explainTransmissionOfHereditaryInformation
Action: create
Status: implemented

[explainTransmissionOfHereditaryInformation.data.ts](../../data/skills/geneticsAndEvolution/genetics/skills/explainTransmissionOfHereditaryInformation.data.ts)

Methodological description: Explain how DNA is copied and distributed during cell division and passed between generations through sex cells or asexual reproduction. Distinguish transmission of molecular information from its expression in observable traits.
User-friendly description: Understand how hereditary information is copied and passed on.

##### Distinguish a Gene from a Trait

Slug: distinguishAGeneFromATrait
Action: create
Status: implemented

[distinguishAGeneFromATrait.data.ts](../../data/skills/geneticsAndEvolution/genetics/skills/distinguishAGeneFromATrait.data.ts)

Methodological description: Explain that a gene is a segment of hereditary information, while an observable trait results from its activity and environmental influences.
User-friendly description: Distinguish a gene from the visible trait it may help influence.

##### Explain Mechanisms of Trait Inheritance

Slug: explainMechanismsOfTraitInheritance
Action: create
Status: implemented

[explainMechanismsOfTraitInheritance.data.ts](../../data/skills/geneticsAndEvolution/genetics/skills/explainMechanismsOfTraitInheritance.data.ts)

Methodological description: Explain the roles of genes, alleles, and chromosomes, segregation of alleles, and formation of their combinations in offspring. Apply Mendelian patterns where appropriate and distinguish them from polygenic and environmentally influenced traits.
User-friendly description: Explore how genes and their variants are inherited across generations.

##### Explain Expression of Genetic Information

Slug: explainExpressionOfGeneticInformation
Action: create
Status: implemented

[explainExpressionOfGeneticInformation.data.ts](../../data/skills/geneticsAndEvolution/genetics/skills/explainExpressionOfGeneticInformation.data.ts)

Methodological description: Explain how DNA information can be transcribed into RNA and realized through protein synthesis and regulation of gene activity; do not equate an individual gene with a ready-made phenotypic trait.
User-friendly description: Follow how DNA information is used and regulated within cells.

#### Evolutionary Changes

Slug: evolutionaryChanges
Action: create
Status: implemented

Skills: 8

[evolutionaryChanges.data.ts](../../data/skills/geneticsAndEvolution/evolutionaryChanges/evolutionaryChanges.data.ts)

Methodological description: Hereditary variation and differences in reproductive success alter the prevalence of traits in populations across generations; this is not the same as development of an individual organism.
User-friendly description: Discover how inherited variation changes within populations over generations.

##### Explain Hereditary Variation Among Individuals

Slug: explainHereditaryVariationAmongIndividuals
Action: create
Status: implemented

[explainHereditaryVariationAmongIndividuals.data.ts](../../data/skills/geneticsAndEvolution/evolutionaryChanges/skills/explainHereditaryVariationAmongIndividuals.data.ts)

Methodological description: Relate differences that may be inherited to diversity among individuals and the possibility of population change.
User-friendly description: Explain why inherited differences exist between individuals.

##### Explain Natural Selection

Slug: explainNaturalSelection
Action: create
Status: implemented

[explainNaturalSelection.data.ts](../../data/skills/geneticsAndEvolution/evolutionaryChanges/skills/explainNaturalSelection.data.ts)

Methodological description: Explain how inherited differences in survival and reproductive success change the frequencies of hereditary variants in a population over generations; selection is neither a conscious choice by organisms nor progress toward predetermined perfection.
User-friendly description: Understand how natural selection can change inherited traits across generations.

##### Distinguish Individual Changes During Life from Population Changes

Slug: distinguishIndividualChangesDuringLifeFromPopulationChanges
Action: create
Status: implemented

[distinguishIndividualChangesDuringLifeFromPopulationChanges.data.ts](../../data/skills/geneticsAndEvolution/evolutionaryChanges/skills/distinguishIndividualChangesDuringLifeFromPopulationChanges.data.ts)

Methodological description: Distinguish changes in the growth or behavior of one individual from changes in the frequencies of inherited traits in a population.
User-friendly description: Distinguish changes during an individual's life from evolution across generations.

##### Interpret Evidence of Evolution

Slug: interpretEvidenceOfEvolution
Action: create
Status: implemented

[interpretEvidenceOfEvolution.data.ts](../../data/skills/geneticsAndEvolution/evolutionaryChanges/skills/interpretEvidenceOfEvolution.data.ts)

Methodological description: Explain convergent evidence for life's history from fossils, comparative anatomy, biogeography, embryology, and molecular data, taking into account the limitations of each type of evidence.
User-friendly description: Explore how fossils, anatomy and DNA provide evidence for evolution.

##### Explain the Theory of Evolution

Slug: explainTheTheoryOfEvolution
Action: create
Status: implemented

[explainTheTheoryOfEvolution.data.ts](../../data/skills/geneticsAndEvolution/evolutionaryChanges/skills/explainTheTheoryOfEvolution.data.ts)

Methodological description: Explain modern evolutionary theory as a scientific explanation of changes in inherited population characteristics and the diversity of life, supported by multiple converging lines of evidence. Distinguish a scientific theory from individual hypotheses, factual observations, and claims of purpose-directed development.
User-friendly description: Understand evolution as a scientific explanation supported by multiple kinds of evidence.

##### Explain Common Ancestry of Species

Slug: explainCommonAncestryOfSpecies
Action: create
Status: implemented

[explainCommonAncestryOfSpecies.data.ts](../../data/skills/geneticsAndEvolution/evolutionaryChanges/skills/explainCommonAncestryOfSpecies.data.ts)

Methodological description: Explain that different species may descend from common ancestors and that an evolutionary tree represents branching lineages; distinguish a common ancestor from a modern species supposedly transforming directly into another.
User-friendly description: Explain how different species can share ancestors in a branching family history.

##### Explain Speciation

Slug: explainSpeciation
Action: create
Status: implemented

[explainSpeciation.data.ts](../../data/skills/geneticsAndEvolution/evolutionaryChanges/skills/explainSpeciation.data.ts)

Methodological description: Explain how hereditary variation, population divergence, restricted gene flow, and reproductive isolation may give rise to new species; recognize that mechanisms of speciation differ among groups of organisms.
User-friendly description: Discover how populations can diverge and form new species.

##### Explain Mechanisms of Evolutionary Change

Slug: explainMechanismsOfEvolutionaryChange
Action: create
Status: implemented

[explainMechanismsOfEvolutionaryChange.data.ts](../../data/skills/geneticsAndEvolution/evolutionaryChanges/skills/explainMechanismsOfEvolutionaryChange.data.ts)

Methodological description: Distinguish mutation, natural selection, genetic drift, and gene flow as processes that alter the inherited composition of populations; explain their distinct roles and potential combined action without reducing all evolutionary change to selection.
User-friendly description: Compare mutation, natural selection, genetic drift and gene flow as causes of evolution.

### Biotechnology

Slug: biotechnology
Action: create
Status: implemented

Groups: 0 · Skills: 5

[biotechnology.data.ts](../../data/skills/biotechnology/biotechnology.data.ts)

Methodological description: Use of properties of organisms, cells, enzymes, and hereditary information to obtain products and intentionally change traits. Includes selective breeding, genetic modification, and analysis of potential ecological consequences of interventions; natural ecosystem interactions belong to Ecology, while engineering applications of biological principles belong to the separate subject Engineering.
User-friendly description: Explore how people use organisms, cells and biological processes to make useful products.

#### Recognize Human Uses of Microorganisms

Slug: recognizeHumanUsesOfMicroorganisms
Action: create
Status: implemented

[recognizeHumanUsesOfMicroorganisms.data.ts](../../data/skills/biotechnology/skills/recognizeHumanUsesOfMicroorganisms.data.ts)

Methodological description: Identify how yeasts or bacteria are used to produce food or other products.
User-friendly description: Recognize ways bacteria and yeasts are used to produce foods and other materials.

#### Explain the Principle of Selective Breeding

Slug: explainThePrincipleOfSelectiveBreeding
Action: create
Status: implemented

[explainThePrincipleOfSelectiveBreeding.data.ts](../../data/skills/biotechnology/skills/explainThePrincipleOfSelectiveBreeding.data.ts)

Methodological description: Define selective breeding as purposeful selection and reproduction of organisms with desired inherited traits across generations to create or improve crop varieties and animal breeds. Understand that a breeder selects carriers of hereditary variants rather than arbitrarily 'ordering' a characteristic in each offspring.
User-friendly description: Understand how selective breeding develops inherited traits over generations.

#### Explain the Principle of Genetic Modification

Slug: explainThePrincipleOfGeneticModification
Action: create
Status: implemented

[explainThePrincipleOfGeneticModification.data.ts](../../data/skills/biotechnology/skills/explainThePrincipleOfGeneticModification.data.ts)

Methodological description: Define genetic modification as the intentional alteration of genetic material by biotechnological methods. Distinguish changing DNA from simply selecting organisms by traits without assuming that every genetic change automatically brings benefits or harm.
User-friendly description: Explain how genetic modification changes DNA, unlike choosing parents for breeding.

#### Explain the Purpose of a Simple Biotechnological Procedure

Slug: explainThePurposeOfASimpleBiotechnologicalProcedure
Action: create
Status: implemented

[explainThePurposeOfASimpleBiotechnologicalProcedure.data.ts](../../data/skills/biotechnology/skills/explainThePurposeOfASimpleBiotechnologicalProcedure.data.ts)

Methodological description: Relate organisms, cells, or enzymes used in a procedure to a specific product or expected transformation.
User-friendly description: Connect the organisms or enzymes in a procedure with its intended product.

#### Evaluate Ecological Risks of Biotechnology Use

Slug: evaluateEcologicalRisksOfBiotechnologyUse
Action: create
Status: implemented

[evaluateEcologicalRisksOfBiotechnologyUse.data.ts](../../data/skills/biotechnology/skills/evaluateEcologicalRisksOfBiotechnologyUse.data.ts)

Methodological description: Consider the likelihood of undesirable effects on nontarget species, ecosystem relationships, or the spread of organisms, distinguishing risk from demonstrated harm.
User-friendly description: Explore possible ecological risks of biotechnology without assuming every risk causes harm.

# Astronomy — Skills Taxonomy

Date: 2026-10-29

A subject-wide, audience-independent catalog of astronomy competencies. It covers cosmic-object classification, observational astronomy, celestial dynamics, the Earth–Moon–Sun system, the Solar System, planetary science, stellar and galactic astronomy, exoplanets, cosmology, astrobiology and scientific space exploration. The hierarchy is a classification, not a lesson sequence, prerequisite graph, curriculum, assessment rubric or learner-progress model. Each competency may be taught at different depths by different Curricula; introductory programs need not include every Skill.

**Subject boundaries:** Astronomy owns the observation, classification and scientific explanation of celestial objects, astronomical signals and cosmic phenomena. The general physical laws of gravity, optics, plasma, nuclear reactions and electromagnetism may also be taught in Physics; Astronomy treats their application to celestial evidence. Geography addresses Earth's spatial and environmental systems, while Astronomy addresses Earth's astronomical setting and celestial cycles. Engineering owns spacecraft and instrument design; Astronomy owns what their measurements can establish. History addresses the chronology and cultural context of discoveries, while Astronomy may analyze how observational evidence changes scientific models. Overlap with other textbooks is permitted and does not establish shared global Skill IDs.

**References for coverage checks (not adopted syllabuses):** [OpenStax Astronomy 2e](https://openstax.org/books/astronomy-2e/pages/preface), [IAU Office of Astronomy for Education — Big Ideas in Astronomy](https://astro4edu.org/bigideas/bigideas/), [NASA Solar System Facts](https://science.nasa.gov/solar-system/solar-system-facts/), [NASA Free-Floating Planets](https://www.nasa.gov/image-article/jupiter-like-rogue-planet-wanders-alone-space/), [NASA Universe Glossary](https://science.nasa.gov/universe/glossary/), and [Studio Subject Proposition](../../../../studio/Subject%20Proposition.md). The question-led encyclopedia section “What is it in space?” is a content format, not a SkillGroup; individual object profiles can reference multiple Skills.

**Editorial state:** Draft for subject-editor review. No Skills, Groups or Domains are claimed to have runtime implementations.

## SUMMARY

Domains: 13
Groups: 49
Skills: 212

Code files: 0/13 Domains · 0/49 Groups · 0/212 Skills

## DOMAINS

### Cosmic Objects

Slug: cosmicObjects
Action: create
Status: implemented

Groups: 2 · Skills: 7

[cosmicObjects.data.ts](../../data/skills/cosmicObjects/cosmicObjects.data.ts)

Methodological description: An overview of what kinds of physical objects and extended structures exist beyond Earth and how they are identified and organized. It teaches classification across cosmic scales and distinguishes an object's physical nature from its environment or apparent visual form; detailed physics belongs to the specialized planetary, stellar, galactic and cosmological domains.
User-friendly description: Explore the different kinds of objects and structures found in the universe and how astronomers classify them.

#### Object Families

Slug: objectFamilies
Action: create
Status: implemented

Skills: 4

[objectFamilies.data.ts](../../data/skills/cosmicObjects/objectFamilies/objectFamilies.data.ts)

Methodological description: Classification of astronomical entities requires more than their appearance in a photograph: a point source, a diffuse cloud, a cluster and an extended galaxy may be distinguished by physical evidence and scale.
User-friendly description: Learn how astronomers identify different types of objects using physical evidence rather than appearance alone.

##### Celestial Object Classification

Slug: celestialObjectClassification
Action: create
Status: implemented

[celestialObjectClassification.data.ts](../../data/skills/cosmicObjects/objectFamilies/skills/celestialObjectClassification.data.ts)

Methodological description: Classify astronomical sources as stellar bodies, planetary bodies, compact remnants, diffuse clouds, star clusters, galaxies or other broad physical types using characteristic evidence rather than appearance alone.
User-friendly description: Recognize major categories of celestial objects by their physical properties.

##### Objects and Phenomena

Slug: objectsAndPhenomena
Action: create
Status: implemented

[objectsAndPhenomena.data.ts](../../data/skills/cosmicObjects/objectFamilies/skills/objectsAndPhenomena.data.ts)

Methodological description: Distinguish enduring physical objects and systems from observed events or effects such as eclipses, meteors, flares and transient brightenings, even when both occur in object catalogs.
User-friendly description: Tell the difference between a lasting celestial object and an event such as an eclipse or flare.

##### Stellar, Substellar and Planetary Boundaries

Slug: stellarSubstellarAndPlanetaryBoundaries
Action: create
Status: implemented

[stellarSubstellarAndPlanetaryBoundaries.data.ts](../../data/skills/cosmicObjects/objectFamilies/skills/stellarSubstellarAndPlanetaryBoundaries.data.ts)

Methodological description: Compare physically distinct stars, brown dwarfs and planetary-mass bodies using fusion and mass constraints while acknowledging uncertainties near classification boundaries.
User-friendly description: Explore how stars, brown dwarfs and planets differ, including where their categories overlap.

##### Diffuse and Composite Objects

Slug: diffuseAndCompositeObjects
Action: create
Status: implemented

[diffuseAndCompositeObjects.data.ts](../../data/skills/cosmicObjects/objectFamilies/skills/diffuseAndCompositeObjects.data.ts)

Methodological description: Differentiate diffuse nebulae, gravitationally associated groups and composite galaxies by their constituents, structure and binding rather than surface resemblance.
User-friendly description: Distinguish gas clouds, star groups and galaxies by what they contain and how they are organized.

#### Organization and Membership

Slug: organizationAndMembership
Action: create
Status: implemented

Skills: 3

[organizationAndMembership.data.ts](../../data/skills/cosmicObjects/organizationAndMembership/organizationAndMembership.data.ts)

Methodological description: A body's membership in a system is a different property from its type; the same class of object can be gravitationally bound, ejected or found in a sparse galactic environment.
User-friendly description: Discover how objects belong to larger astronomical systems or travel independently.

##### Gravitationally Bound Systems

Slug: gravitationallyBoundSystems
Action: create
Status: implemented

[gravitationallyBoundSystems.data.ts](../../data/skills/cosmicObjects/organizationAndMembership/skills/gravitationallyBoundSystems.data.ts)

Methodological description: Distinguish satellite systems, planetary systems, multiple stars, star clusters, galaxies and galaxy clusters by physical membership and characteristic scales.
User-friendly description: Compare planetary systems, star clusters, galaxies and other gravitationally connected systems.

##### Free-Floating Planets

Slug: freeFloatingPlanets
Action: create
Status: implemented

[freeFloatingPlanets.data.ts](../../data/skills/cosmicObjects/organizationAndMembership/skills/freeFloatingPlanets.data.ts)

Methodological description: Explain planetary-mass objects not gravitationally bound to a host star, including proposed ejection or isolated-formation origins and detection by microlensing or thermal infrared emission; distinguish low illumination from a complete absence of radiation.
User-friendly description: Learn how planets without a host star may form, move and be detected.

##### Object Membership and Isolation

Slug: objectMembershipAndIsolation
Action: create
Status: implemented

[objectMembershipAndIsolation.data.ts](../../data/skills/cosmicObjects/organizationAndMembership/skills/objectMembershipAndIsolation.data.ts)

Methodological description: Determine whether an astronomical object is a member of a larger bound system or is apparently isolated, and explain why gravitational context does not by itself determine intrinsic object type.
User-friendly description: Find out whether an object belongs to a larger system without confusing that with what kind of object it is.

### Observing the Sky

Slug: observingTheSky
Action: create
Status: implemented

Groups: 4 · Skills: 19

[observingTheSky.data.ts](../../data/skills/observingTheSky/observingTheSky.data.ts)

Methodological description: This domain addresses how celestial positions, patterns, brightness and changes are represented from an observer's location on Earth. It treats the sky as an observable system while distinguishing apparent motion from the physical causes developed in celestial mechanics.
User-friendly description: Learn to describe where objects appear in the sky and how their positions change with time and location.

#### Sky Geometry

Slug: skyGeometry
Action: create
Status: implemented

Skills: 4

[skyGeometry.data.ts](../../data/skills/observingTheSky/skyGeometry/skyGeometry.data.ts)

Methodological description: Positions and separations in the visible sky can be communicated through directional frames and angular quantities rather than terrestrial distance alone.
User-friendly description: Use angles and sky coordinates to describe the direction of objects seen from Earth.

##### Celestial Sphere

Slug: celestialSphere
Action: create
Status: implemented

[celestialSphere.data.ts](../../data/skills/observingTheSky/skyGeometry/skills/celestialSphere.data.ts)

Methodological description: Interpret the apparent projection of distant objects onto an imaginary sphere without treating that sphere as a physical shell.
User-friendly description: Understand the imaginary celestial sphere used to map the night sky.

##### Horizon Coordinates

Slug: horizonCoordinates
Action: create
Status: implemented

[horizonCoordinates.data.ts](../../data/skills/observingTheSky/skyGeometry/skills/horizonCoordinates.data.ts)

Methodological description: Locate a celestial object using altitude and azimuth relative to an observer's horizon and orientation.
User-friendly description: Find a sky object's direction using its height above the horizon and compass bearing.

##### Equatorial Coordinates

Slug: equatorialCoordinates
Action: create
Status: implemented

[equatorialCoordinates.data.ts](../../data/skills/observingTheSky/skyGeometry/skills/equatorialCoordinates.data.ts)

Methodological description: Interpret right ascension and declination as a coordinate system tied to Earth's rotational axis.
User-friendly description: Read right ascension and declination to locate objects on a celestial map.

##### Angular Separation

Slug: angularSeparation
Action: create
Status: implemented

[angularSeparation.data.ts](../../data/skills/observingTheSky/skyGeometry/skills/angularSeparation.data.ts)

Methodological description: Determine or compare angular distances and apparent sizes on the sky independently of an object's physical diameter or distance.
User-friendly description: Compare how far apart objects appear in the sky using angles rather than kilometres.

#### Sky Patterns

Slug: skyPatterns
Action: create
Status: implemented

Skills: 6

[skyPatterns.data.ts](../../data/skills/observingTheSky/skyPatterns/skyPatterns.data.ts)

Methodological description: Recognizable configurations make celestial scenes navigable, but their visibility and apparent arrangement depend on viewpoint and date.
User-friendly description: Recognize sky patterns and understand how their visibility changes.

##### Constellations

Slug: constellations
Action: create
Status: implemented

[constellations.data.ts](../../data/skills/observingTheSky/skyPatterns/skills/constellations.data.ts)

Methodological description: Use officially defined regions of the celestial sphere to locate objects without assuming their member stars form a physical cluster.
User-friendly description: Use constellation regions to locate objects without assuming their stars are physically close together.

##### Asterisms

Slug: asterisms
Action: create
Status: implemented

[asterisms.data.ts](../../data/skills/observingTheSky/skyPatterns/skills/asterisms.data.ts)

Methodological description: Recognize named visual star patterns that can cross constellation boundaries and distinguish them from officially defined regions.
User-friendly description: Identify familiar star patterns that are not necessarily official constellations.

##### Apparent Brightness

Slug: apparentBrightness
Action: create
Status: implemented

[apparentBrightness.data.ts](../../data/skills/observingTheSky/skyPatterns/skills/apparentBrightness.data.ts)

Methodological description: Compare how bright celestial objects look from Earth without equating observed brightness with intrinsic luminosity.
User-friendly description: Compare how bright objects look from Earth, without confusing brightness with their actual light output.

##### Daily Sky Motion

Slug: dailySkyMotion
Action: create
Status: implemented

[dailySkyMotion.data.ts](../../data/skills/observingTheSky/skyPatterns/skills/dailySkyMotion.data.ts)

Methodological description: Describe the apparent east-to-west paths of celestial objects across the sky, including circumpolar paths.
User-friendly description: Describe how stars appear to travel across the sky during a day or night.

##### Seasonal Sky Visibility

Slug: seasonalSkyVisibility
Action: create
Status: implemented

[seasonalSkyVisibility.data.ts](../../data/skills/observingTheSky/skyPatterns/skills/seasonalSkyVisibility.data.ts)

Methodological description: Explain why different stars and constellations become visible at different times of the year.
User-friendly description: Explain why different star patterns are visible in different seasons.

##### Stellar Proper Motion

Slug: stellarProperMotion
Action: create
Status: implemented

[stellarProperMotion.data.ts](../../data/skills/observingTheSky/skyPatterns/skills/stellarProperMotion.data.ts)

Methodological description: Identify the slow positional motion of a star relative to distant background sources and distinguish this physical change from the daily apparent rotation of the sky.
User-friendly description: Recognize a star's very slow movement against more distant stars.

#### Observation Practice

Slug: observationPractice
Action: create
Status: implemented

Skills: 4

[observationPractice.data.ts](../../data/skills/observingTheSky/observationPractice/observationPractice.data.ts)

Methodological description: Reliable sky observation requires choosing conditions, finding objects, maintaining records and avoiding preventable observational hazards.
User-friendly description: Plan safe, useful sky observations and keep records that others can understand.

##### Observing Conditions

Slug: observingConditions
Action: create
Status: implemented

[observingConditions.data.ts](../../data/skills/observingTheSky/observationPractice/skills/observingConditions.data.ts)

Methodological description: Evaluate how clouds, atmospheric turbulence, transparency, artificial light and horizon obstructions affect a planned observation.
User-friendly description: Choose observing times and places with suitable weather, darkness and visibility.

##### Sky Maps and Star Charts

Slug: skyMapsAndStarCharts
Action: create
Status: implemented

[skyMapsAndStarCharts.data.ts](../../data/skills/observingTheSky/observationPractice/skills/skyMapsAndStarCharts.data.ts)

Methodological description: Use a chart or planetarium representation to identify celestial directions, objects and visibility for a specified place and time.
User-friendly description: Read a sky map for a particular location and date.

##### Astronomical Observation Records

Slug: astronomicalObservationRecords
Action: create
Status: implemented

[astronomicalObservationRecords.data.ts](../../data/skills/observingTheSky/observationPractice/skills/astronomicalObservationRecords.data.ts)

Methodological description: Record the time, location, conditions, method and observed changes so that a sighting can be interpreted or compared.
User-friendly description: Record when, where and how you saw something in the sky.

##### Safe Solar Observation

Slug: safeSolarObservation
Action: create
Status: implemented

[safeSolarObservation.data.ts](../../data/skills/observingTheSky/observationPractice/skills/safeSolarObservation.data.ts)

Methodological description: Distinguish approved solar-viewing methods from unsafe direct viewing or unfiltered optical magnification.
User-friendly description: Identify safe ways to view the Sun and avoid methods that can damage eyesight.

#### Astronomical Time

Slug: astronomicalTime
Action: create
Status: implemented

Skills: 5

[astronomicalTime.data.ts](../../data/skills/observingTheSky/astronomicalTime/astronomicalTime.data.ts)

Methodological description: Timekeeping conventions derived from repeated celestial cycles support observation and comparison across dates, without constituting a curriculum in civil time zones.
User-friendly description: Explore how recurring movements of the Sun, Moon and stars are used to measure time.

##### Solar Time

Slug: solarTime
Action: create
Status: implemented

[solarTime.data.ts](../../data/skills/observingTheSky/astronomicalTime/skills/solarTime.data.ts)

Methodological description: Describe Sun-referenced time as related to the apparent position of the Sun, including mean and apparent solar conventions.
User-friendly description: Understand how the Sun's position relates to solar time.

##### Sidereal Time

Slug: siderealTime
Action: create
Status: implemented

[siderealTime.data.ts](../../data/skills/observingTheSky/astronomicalTime/skills/siderealTime.data.ts)

Methodological description: Explain how rotation relative to distant stars defines sidereal time and predicts which celestial coordinates cross a local meridian.
User-friendly description: Use the stars' apparent motion to understand sidereal time.

##### Astronomical Dates and Epochs

Slug: astronomicalDatesAndEpochs
Action: create
Status: implemented

[astronomicalDatesAndEpochs.data.ts](../../data/skills/observingTheSky/astronomicalTime/skills/astronomicalDatesAndEpochs.data.ts)

Methodological description: Interpret a standard astronomical date or reference epoch when comparing observations made at different times.
User-friendly description: Interpret astronomical dates and reference epochs when comparing observations.

##### Lunar Calendar Cycles

Slug: lunarCalendarCycles
Action: create
Status: implemented

[lunarCalendarCycles.data.ts](../../data/skills/observingTheSky/astronomicalTime/skills/lunarCalendarCycles.data.ts)

Methodological description: Relate lunar-based calendar intervals to Moon phases while recognizing different calendar conventions.
User-friendly description: Connect the changing phases of the Moon with lunar calendar cycles.

##### Solar Calendar Cycles

Slug: solarCalendarCycles
Action: create
Status: implemented

[solarCalendarCycles.data.ts](../../data/skills/observingTheSky/astronomicalTime/skills/solarCalendarCycles.data.ts)

Methodological description: Relate solar-year calendar intervals to Earth's annual revolution and seasons without assuming universal calendar rules.
User-friendly description: Connect the annual motion of Earth with solar calendar cycles.

### Astronomical Instruments and Evidence

Slug: astronomicalInstrumentsAndEvidence
Action: create
Status: implemented

Groups: 6 · Skills: 30

[astronomicalInstrumentsAndEvidence.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/astronomicalInstrumentsAndEvidence.data.ts)

Methodological description: Astronomy infers properties of remote objects from electromagnetic radiation, gravitational effects, particles and spacecraft observations. This domain covers what an observation can reveal, how instruments and methods constrain the evidence, and how competing interpretations are evaluated, not the engineering construction of observatories and spacecraft.
User-friendly description: Discover how astronomers gather evidence from light, gravity, particles and space missions to study distant worlds.

#### Telescopes and Detectors

Slug: telescopesAndDetectors
Action: create
Status: implemented

Skills: 7

[telescopesAndDetectors.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/telescopesAndDetectors/telescopesAndDetectors.data.ts)

Methodological description: Instrumentation alters the detail, wavelengths and measurable signals available to observers; its scientific limitations are as important as its capabilities.
User-friendly description: Explore what telescopes and detectors can reveal and why their measurements have limits.

##### Light-Gathering Aperture

Slug: lightGatheringAperture
Action: create
Status: implemented

[lightGatheringAperture.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/telescopesAndDetectors/skills/lightGatheringAperture.data.ts)

Methodological description: Explain how telescope aperture affects collected light and the visibility of faint astronomical sources.
User-friendly description: Find out why a larger telescope aperture can reveal fainter celestial objects.

##### Angular Resolution

Slug: angularResolution
Action: create
Status: implemented

[angularResolution.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/telescopesAndDetectors/skills/angularResolution.data.ts)

Methodological description: Explain the ability to distinguish nearby sources, including effects of aperture, wavelength and atmospheric seeing.
User-friendly description: Explain why two nearby objects may look separate or blend together in a telescope.

##### Optical Telescope Systems

Slug: opticalTelescopeSystems
Action: create
Status: implemented

[opticalTelescopeSystems.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/telescopesAndDetectors/skills/opticalTelescopeSystems.data.ts)

Methodological description: Interpret the scientific roles of refractors, reflectors and optical configurations without designing their mechanical construction.
User-friendly description: Compare how refracting and reflecting telescopes collect and focus light.

##### Astronomical Detectors

Slug: astronomicalDetectors
Action: create
Status: implemented

[astronomicalDetectors.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/telescopesAndDetectors/skills/astronomicalDetectors.data.ts)

Methodological description: Explain how detectors capture light or other signals and why exposure, noise, calibration and sensitivity matter.
User-friendly description: See how astronomical detectors measure faint signals and why noise and calibration matter.

##### Radio Astronomy

Slug: radioAstronomy
Action: create
Status: implemented

[radioAstronomy.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/telescopesAndDetectors/skills/radioAstronomy.data.ts)

Methodological description: Interpret observations at radio wavelengths, including the kinds of astronomical sources and atmospheric or detector limitations relevant to these measurements.
User-friendly description: Discover what radio signals reveal about the universe.

##### Astronomical Interferometry

Slug: astronomicalInterferometry
Action: create
Status: implemented

[astronomicalInterferometry.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/telescopesAndDetectors/skills/astronomicalInterferometry.data.ts)

Methodological description: Explain how correlated signals from separated receivers constrain angular structure in radio and optical astronomy and why baseline geometry matters.
User-friendly description: Understand how combining signals from separated telescopes can reveal finer detail.

##### Space-Based Observation

Slug: spaceBasedObservation
Action: create
Status: implemented

[spaceBasedObservation.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/telescopesAndDetectors/skills/spaceBasedObservation.data.ts)

Methodological description: Compare observations above and below Earth's atmosphere in terms of accessible wavelengths and atmospheric interference.
User-friendly description: Compare observations from space with those made through Earth's atmosphere.

#### Astronomical Spectra

Slug: astronomicalSpectra
Action: create
Status: implemented

Skills: 5

[astronomicalSpectra.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/astronomicalSpectra/astronomicalSpectra.data.ts)

Methodological description: Light encodes information about temperature, composition and motion through its distribution across wavelength and the signatures imprinted by matter.
User-friendly description: Learn how splitting light into wavelengths reveals properties of distant objects.

##### Continuous Spectra

Slug: continuousSpectra
Action: create
Status: implemented

[continuousSpectra.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/astronomicalSpectra/skills/continuousSpectra.data.ts)

Methodological description: Infer broad thermal properties from the distribution of emitted light across wavelengths while recognizing idealized blackbody assumptions.
User-friendly description: Use a continuous spectrum to explore an object's temperature and emitted light.

##### Emission Spectral Lines

Slug: emissionSpectralLines
Action: create
Status: implemented

[emissionSpectralLines.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/astronomicalSpectra/skills/emissionSpectralLines.data.ts)

Methodological description: Interpret discrete bright features produced by matter radiating at characteristic wavelengths.
User-friendly description: Recognize bright spectral lines as clues to the material producing light.

##### Absorption Spectral Lines

Slug: absorptionSpectralLines
Action: create
Status: implemented

[absorptionSpectralLines.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/astronomicalSpectra/skills/absorptionSpectralLines.data.ts)

Methodological description: Interpret dark spectral features produced by matter absorbing characteristic wavelengths from background radiation.
User-friendly description: Recognize dark spectral lines as clues to material absorbing light.

##### Doppler Shift

Slug: dopplerShift
Action: create
Status: implemented

[dopplerShift.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/astronomicalSpectra/skills/dopplerShift.data.ts)

Methodological description: Interpret wavelength shifts due to relative radial motion, distinguishing this local effect from cosmological expansion.
User-friendly description: Use shifts in wavelength to investigate motion toward or away from an observer.

##### Multiwavelength Observation

Slug: multiwavelengthObservation
Action: create
Status: implemented

[multiwavelengthObservation.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/astronomicalSpectra/skills/multiwavelengthObservation.data.ts)

Methodological description: Relate observations in different electromagnetic bands to distinct physical components and processes within one object.
User-friendly description: Combine images and measurements from different kinds of light to understand a celestial object.

#### Distances and Physical Properties

Slug: distancesAndPhysicalProperties
Action: create
Status: implemented

Skills: 6

[distancesAndPhysicalProperties.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/distancesAndPhysicalProperties/distancesAndPhysicalProperties.data.ts)

Methodological description: Astronomical measurements connect remote observations to inferred size, distance and energy output using explicit models rather than direct contact.
User-friendly description: Explore how astronomers estimate properties they cannot measure directly.

##### Stellar Parallax

Slug: stellarParallax
Action: create
Status: implemented

[stellarParallax.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/distancesAndPhysicalProperties/skills/stellarParallax.data.ts)

Methodological description: Infer distances to nearby stars from the apparent displacement caused by changing observing positions.
User-friendly description: Use a nearby star's changing apparent position to estimate its distance.

##### Apparent Magnitude

Slug: apparentMagnitude
Action: create
Status: implemented

[apparentMagnitude.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/distancesAndPhysicalProperties/skills/apparentMagnitude.data.ts)

Methodological description: Interpret a logarithmic brightness scale describing how bright a source appears to an observer.
User-friendly description: Understand the scale astronomers use to describe how bright a celestial object appears.

##### Absolute Magnitude

Slug: absoluteMagnitude
Action: create
Status: implemented

[absoluteMagnitude.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/distancesAndPhysicalProperties/skills/absoluteMagnitude.data.ts)

Methodological description: Interpret a source's magnitude at a defined reference distance and use it to compare intrinsic brightness.
User-friendly description: Compare objects' intrinsic brightness using the same reference distance.

##### Standard Candles

Slug: standardCandles
Action: create
Status: implemented

[standardCandles.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/distancesAndPhysicalProperties/skills/standardCandles.data.ts)

Methodological description: Explain how calibrated luminosity indicators support distance estimates beyond direct parallax measurements.
User-friendly description: Discover how objects of known brightness can help estimate distances.

##### Cosmic Distance Ladder

Slug: cosmicDistanceLadder
Action: create
Status: implemented

[cosmicDistanceLadder.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/distancesAndPhysicalProperties/skills/cosmicDistanceLadder.data.ts)

Methodological description: Explain why different distance indicators apply across different ranges and how calibration errors can propagate.
User-friendly description: See why astronomers use different methods to measure distances across the universe.

##### Astronomical Distance Units

Slug: astronomicalDistanceUnits
Action: create
Status: implemented

[astronomicalDistanceUnits.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/distancesAndPhysicalProperties/skills/astronomicalDistanceUnits.data.ts)

Methodological description: Interpret astronomical units, light-years and parsecs as units of length, relate their scales and distinguish light-travel distance from travel duration.
User-friendly description: Compare astronomical units, light-years and parsecs as measures of distance.

#### Evidence and Interpretation

Slug: evidenceAndInterpretation
Action: create
Status: implemented

Skills: 4

[evidenceAndInterpretation.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/evidenceAndInterpretation/evidenceAndInterpretation.data.ts)

Methodological description: Astronomical conclusions require comparisons between predictions and measured signals, including attention to uncertainty and alternative explanations.
User-friendly description: Learn to judge astronomical conclusions using measurements, uncertainties and competing explanations.

##### Astronomical Light Curves

Slug: astronomicalLightCurves
Action: create
Status: implemented

[astronomicalLightCurves.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/evidenceAndInterpretation/skills/astronomicalLightCurves.data.ts)

Methodological description: Interpret changes in brightness over time as evidence for rotation, variability, eclipses or transiting objects.
User-friendly description: Read a brightness-over-time graph for clues to changes in a celestial object.

##### Measurement Uncertainty

Slug: measurementUncertainty
Action: create
Status: implemented

[measurementUncertainty.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/evidenceAndInterpretation/skills/measurementUncertainty.data.ts)

Methodological description: Evaluate how instrument limits, measurement error and model assumptions affect the confidence of an astronomical inference.
User-friendly description: Recognize how errors and assumptions affect confidence in astronomical measurements.

##### Observational Selection Effects

Slug: observationalSelectionEffects
Action: create
Status: implemented

[observationalSelectionEffects.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/evidenceAndInterpretation/skills/observationalSelectionEffects.data.ts)

Methodological description: Identify how detection thresholds and survey methods bias the populations of celestial objects that appear in catalogs.
User-friendly description: Discover why telescopes and surveys detect some objects more easily than others.

##### Astronomical Model Testing

Slug: astronomicalModelTesting
Action: create
Status: implemented

[astronomicalModelTesting.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/evidenceAndInterpretation/skills/astronomicalModelTesting.data.ts)

Methodological description: Compare competing explanations with observations and revised predictions, including historically important planetary models.
User-friendly description: Compare astronomical models against evidence and decide which predictions hold up.

#### Spacecraft Observations

Slug: spacecraftObservations
Action: create
Status: implemented

Skills: 4

[spacecraftObservations.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/spacecraftObservations/spacecraftObservations.data.ts)

Methodological description: Remote flybys, orbiters, landers and sample-return missions provide different access to remote worlds. These competencies concern scientific evidence, temporal coverage, sampling limits and interpretation; they exclude the engineering design of the vehicles.
User-friendly description: Explore what different spacecraft missions can measure about distant worlds.

##### Flyby Measurements

Slug: flybyMeasurements
Action: create
Status: implemented

[flybyMeasurements.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/spacecraftObservations/skills/flybyMeasurements.data.ts)

Methodological description: Interpret scientific information obtained during a brief spacecraft encounter, including coverage constraints.
User-friendly description: See what a brief spacecraft flyby can reveal—and what it may miss.

##### Orbital Measurements

Slug: orbitalMeasurements
Action: create
Status: implemented

[orbitalMeasurements.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/spacecraftObservations/skills/orbitalMeasurements.data.ts)

Methodological description: Explain how repeated observations from an orbiting spacecraft support mapping and temporal monitoring.
User-friendly description: Understand how repeated observations from orbit help map changing worlds.

##### Landers and Rovers as Scientific Probes

Slug: landersAndRoversAsScientificProbes
Action: create
Status: implemented

[landersAndRoversAsScientificProbes.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/spacecraftObservations/skills/landersAndRoversAsScientificProbes.data.ts)

Methodological description: Interpret the local environmental evidence obtained by landed missions without treating vehicle design as an astronomy competency.
User-friendly description: Learn what surface probes and rovers can discover from local measurements.

##### Sample Return Evidence

Slug: sampleReturnEvidence
Action: create
Status: implemented

[sampleReturnEvidence.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/spacecraftObservations/skills/sampleReturnEvidence.data.ts)

Methodological description: Explain how collected extraterrestrial materials can be analyzed and how contamination or context loss affects conclusions.
User-friendly description: Explore what returned space samples reveal and how contamination can affect findings.

#### Gravitational and Particle Probes

Slug: gravitationalAndParticleProbes
Action: create
Status: implemented

Skills: 4

[gravitationalAndParticleProbes.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/gravitationalAndParticleProbes/gravitationalAndParticleProbes.data.ts)

Methodological description: Gravitational lensing, gravitational waves and astrophysical particles supply information that differs from ordinary electromagnetic imaging and spectroscopy; a multimessenger inference combines distinct independent signals. Lensing is observed through light affected by gravity and is not itself a non-electromagnetic measurement.
User-friendly description: Investigate how gravity and particles provide evidence beyond ordinary astronomical images.

##### Gravitational Lensing

Slug: gravitationalLensing
Action: create
Status: implemented

[gravitationalLensing.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/gravitationalAndParticleProbes/skills/gravitationalLensing.data.ts)

Methodological description: Interpret bending, magnification and distortion of background light by intervening gravity as evidence about mass and source geometry.
User-friendly description: See how gravity bends and magnifies light, revealing otherwise hidden mass.

##### Gravitational-Wave Astronomy

Slug: gravitationalWaveAstronomy
Action: create
Status: implemented

[gravitationalWaveAstronomy.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/gravitationalAndParticleProbes/skills/gravitationalWaveAstronomy.data.ts)

Methodological description: Interpret gravitational-wave detections as evidence about accelerating compact massive systems and compare the signals with electromagnetic observations.
User-friendly description: Find out what gravitational-wave signals tell us about massive, rapidly changing systems.

##### Neutrino Astronomy

Slug: neutrinoAstronomy
Action: create
Status: implemented

[neutrinoAstronomy.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/gravitationalAndParticleProbes/skills/neutrinoAstronomy.data.ts)

Methodological description: Explain how astrophysical neutrinos probe energetic processes that electromagnetic observations may not reveal.
User-friendly description: Discover how neutrinos reveal energetic events that light may not fully show.

##### Multimessenger Evidence

Slug: multimessengerEvidence
Action: create
Status: implemented

[multimessengerEvidence.data.ts](../../data/skills/astronomicalInstrumentsAndEvidence/gravitationalAndParticleProbes/skills/multimessengerEvidence.data.ts)

Methodological description: Explain how electromagnetic light, neutrinos, gravitational waves and particles can offer complementary evidence about an astrophysical event.
User-friendly description: Combine light, gravitational waves and particle detections to investigate one cosmic event.

### Celestial Mechanics

Slug: celestialMechanics
Action: create
Status: implemented

Groups: 3 · Skills: 15

[celestialMechanics.data.ts](../../data/skills/celestialMechanics/celestialMechanics.data.ts)

Methodological description: This domain concerns how gravity and angular momentum govern orbital motion, rotation and mutual perturbations across planetary and stellar systems. Geometrical appearances arising from these motions are addressed separately when the observational phenomenon itself is the competency.
User-friendly description: Explore how gravity and motion shape the paths and rotations of objects in space.

#### Gravitational Motion

Slug: gravitationalMotion
Action: create
Status: implemented

Skills: 6

[gravitationalMotion.data.ts](../../data/skills/celestialMechanics/gravitationalMotion/gravitationalMotion.data.ts)

Methodological description: Gravitational interactions produce trajectories governed by mass, initial conditions and the reference frame in which motion is described.
User-friendly description: Discover how gravity governs the motion of celestial bodies.

##### Universal Gravitation

Slug: universalGravitation
Action: create
Status: implemented

[universalGravitation.data.ts](../../data/skills/celestialMechanics/gravitationalMotion/skills/universalGravitation.data.ts)

Methodological description: Apply the dependence of gravitational attraction on interacting masses and separation to astronomical situations.
User-friendly description: Use the masses and distances of objects to reason about gravitational attraction.

##### Kepler's First Law

Slug: keplersFirstLaw
Action: create
Status: implemented

[keplersFirstLaw.data.ts](../../data/skills/celestialMechanics/gravitationalMotion/skills/keplersFirstLaw.data.ts)

Methodological description: Apply the elliptical-orbit relation, with the central gravitating body at one focus in the idealized two-body model, to the geometry of bound orbits.
User-friendly description: Recognize how an ideal orbit can follow an ellipse with the central body at one focus.

##### Kepler's Second Law

Slug: keplersSecondLaw
Action: create
Status: implemented

[keplersSecondLaw.data.ts](../../data/skills/celestialMechanics/gravitationalMotion/skills/keplersSecondLaw.data.ts)

Methodological description: Use the equal-areas-in-equal-times relation to explain variation in orbital speed as an orbiting body changes its distance from the central focus.
User-friendly description: Explain why an orbiting body moves faster when it is closer to the central body.

##### Kepler's Third Law

Slug: keplersThirdLaw
Action: create
Status: implemented

[keplersThirdLaw.data.ts](../../data/skills/celestialMechanics/gravitationalMotion/skills/keplersThirdLaw.data.ts)

Methodological description: Relate the square of orbital period to the cube of semi-major axis with the appropriate gravitational mass dependence and limitations of the two-body model.
User-friendly description: Relate an object's orbital period to the size of its orbit and the gravitating mass.

##### Orbital Energy

Slug: orbitalEnergy
Action: create
Status: implemented

[orbitalEnergy.data.ts](../../data/skills/celestialMechanics/gravitationalMotion/skills/orbitalEnergy.data.ts)

Methodological description: Relate gravitational potential and kinetic energy to bound and unbound orbital trajectories.
User-friendly description: Explore how energy determines whether an orbit remains bound or escapes.

##### Barycentric Motion

Slug: barycentricMotion
Action: create
Status: implemented

[barycentricMotion.data.ts](../../data/skills/celestialMechanics/gravitationalMotion/skills/barycentricMotion.data.ts)

Methodological description: Explain why interacting celestial bodies orbit a shared center of mass rather than one body always remaining stationary.
User-friendly description: Understand why two orbiting bodies move around a shared centre of mass.

#### Orbits and Rotations

Slug: orbitsAndRotations
Action: create
Status: implemented

Skills: 5

[orbitsAndRotations.data.ts](../../data/skills/celestialMechanics/orbitsAndRotations/orbitsAndRotations.data.ts)

Methodological description: Orbital shapes and body orientations are specified through distinct physical parameters that affect long-term celestial behavior.
User-friendly description: Describe and compare the shapes, periods and orientations of celestial motions.

##### Orbital Elements

Slug: orbitalElements
Action: create
Status: implemented

[orbitalElements.data.ts](../../data/skills/celestialMechanics/orbitsAndRotations/skills/orbitalElements.data.ts)

Methodological description: Interpret inclination, eccentricity and other orbital descriptors when comparing celestial trajectories.
User-friendly description: Read the parameters that describe an orbit's shape and orientation.

##### Orbital Periods

Slug: orbitalPeriods
Action: create
Status: implemented

[orbitalPeriods.data.ts](../../data/skills/celestialMechanics/orbitsAndRotations/skills/orbitalPeriods.data.ts)

Methodological description: Interpret the time needed to complete an orbit and compare sidereal and synodic periods, distinguishing orbital revolution from rotation about the body's own axis.
User-friendly description: Distinguish the time taken to orbit another body from the time taken to spin.

##### Axial Rotation

Slug: axialRotation
Action: create
Status: implemented

[axialRotation.data.ts](../../data/skills/celestialMechanics/orbitsAndRotations/skills/axialRotation.data.ts)

Methodological description: Describe the spin of a world about its axis, including rotation period and direction, independently of the tilt or precession of that axis.
User-friendly description: Describe a celestial body's rotation about its own axis.

##### Axial Tilt

Slug: axialTilt
Action: create
Status: implemented

[axialTilt.data.ts](../../data/skills/celestialMechanics/orbitsAndRotations/skills/axialTilt.data.ts)

Methodological description: Interpret the angle between a body's spin axis and orbital reference direction and explain its influence on illumination geometry and seasons.
User-friendly description: Explore how the tilt of a world's axis changes the pattern of illumination.

##### Synchronous Rotation

Slug: synchronousRotation
Action: create
Status: implemented

[synchronousRotation.data.ts](../../data/skills/celestialMechanics/orbitsAndRotations/skills/synchronousRotation.data.ts)

Methodological description: Explain how spin–orbit coupling can produce a repeating orientation toward an orbital partner.
User-friendly description: Explain why some worlds keep nearly the same face toward their orbital partners.

#### Dynamical Interactions

Slug: dynamicalInteractions
Action: create
Status: implemented

Skills: 4

[dynamicalInteractions.data.ts](../../data/skills/celestialMechanics/dynamicalInteractions/dynamicalInteractions.data.ts)

Methodological description: Real celestial systems include many bodies, so resonances, tides and perturbations can alter otherwise idealized orbital motion.
User-friendly description: Explore how tides and other gravitational interactions alter celestial motions.

##### Tidal Forces

Slug: tidalForces
Action: create
Status: implemented

[tidalForces.data.ts](../../data/skills/celestialMechanics/dynamicalInteractions/skills/tidalForces.data.ts)

Methodological description: Explain differences in gravitational pull across an extended body and their consequences for distortion and orbital evolution.
User-friendly description: See how unequal gravitational pulls across a world create tides.

##### Orbital Resonances

Slug: orbitalResonances
Action: create
Status: implemented

[orbitalResonances.data.ts](../../data/skills/celestialMechanics/dynamicalInteractions/skills/orbitalResonances.data.ts)

Methodological description: Recognize recurring period relationships that can organize or destabilize orbital systems.
User-friendly description: Recognize when repeating orbital timing relationships affect a system.

##### Gravitational Perturbations

Slug: gravitationalPerturbations
Action: create
Status: implemented

[gravitationalPerturbations.data.ts](../../data/skills/celestialMechanics/dynamicalInteractions/skills/gravitationalPerturbations.data.ts)

Methodological description: Interpret departures from a simple two-body orbit caused by additional gravitational influences.
User-friendly description: Explain how extra gravitational forces change an otherwise simple orbit.

##### Orbital Stability

Slug: orbitalStability
Action: create
Status: implemented

[orbitalStability.data.ts](../../data/skills/celestialMechanics/dynamicalInteractions/skills/orbitalStability.data.ts)

Methodological description: Evaluate how changing orbital parameters and interactions can affect whether a system remains dynamically stable.
User-friendly description: Explore what helps an orbital system remain stable—or makes it change.

### Earth, Moon and Sun

Slug: earthMoonAndSun
Action: create
Status: implemented

Groups: 4 · Skills: 14

[earthMoonAndSun.data.ts](../../data/skills/earthMoonAndSun/earthMoonAndSun.data.ts)

Methodological description: Here the distinctive geometry of Earth's viewpoint, rotation and revolution produces observable cycles. The scientific emphasis is on explaining familiar sky events from physical arrangements rather than on general geography or atmospheric meteorology.
User-friendly description: Understand how the movements and positions of Earth, the Moon and the Sun create familiar patterns in the sky.

#### Terrestrial Sky Cycles

Slug: terrestrialSkyCycles
Action: create
Status: implemented

Skills: 4

[terrestrialSkyCycles.data.ts](../../data/skills/earthMoonAndSun/terrestrialSkyCycles/terrestrialSkyCycles.data.ts)

Methodological description: Earth's orientation with respect to sunlight generates daily and annual changes in the visible sky and the duration of daylight.
User-friendly description: Explore how Earth's rotation and tilt shape daylight and seasonal changes.

##### Day and Night

Slug: dayAndNight
Action: create
Status: implemented

[dayAndNight.data.ts](../../data/skills/earthMoonAndSun/terrestrialSkyCycles/skills/dayAndNight.data.ts)

Methodological description: Explain the alternation of illumination and darkness through Earth's rotation rather than the Sun physically circling Earth.
User-friendly description: Explain why Earth's rotation brings alternating daylight and darkness.

##### Seasons

Slug: seasons
Action: create
Status: implemented

[seasons.data.ts](../../data/skills/earthMoonAndSun/terrestrialSkyCycles/skills/seasons.data.ts)

Methodological description: Explain seasonal solar illumination using Earth's axial tilt and orbital revolution rather than changes in Earth–Sun distance alone.
User-friendly description: Discover how Earth's tilted axis produces the seasons.

##### Solstices and Equinoxes

Slug: solsticesAndEquinoxes
Action: create
Status: implemented

[solsticesAndEquinoxes.data.ts](../../data/skills/earthMoonAndSun/terrestrialSkyCycles/skills/solsticesAndEquinoxes.data.ts)

Methodological description: Explain these seasonal reference points from the changing Sun–Earth geometry and the distribution of daylight.
User-friendly description: Understand what makes solstices and equinoxes special points in the year.

##### Solar Altitude and Daylight

Slug: solarAltitudeAndDaylight
Action: create
Status: implemented

[solarAltitudeAndDaylight.data.ts](../../data/skills/earthMoonAndSun/terrestrialSkyCycles/skills/solarAltitudeAndDaylight.data.ts)

Methodological description: Relate the Sun's apparent height and daily path to latitude, date and daylight duration.
User-friendly description: See how the Sun's apparent height and the length of daylight change with place and season.

#### Lunar Appearance

Slug: lunarAppearance
Action: create
Status: implemented

Skills: 4

[lunarAppearance.data.ts](../../data/skills/earthMoonAndSun/lunarAppearance/lunarAppearance.data.ts)

Methodological description: The Moon's changing appearance follows its illumination and orbital viewing geometry, not changes to its intrinsic light production.
User-friendly description: Explore how the Moon's movement and sunlight change what we see from Earth.

##### Lunar Phases

Slug: lunarPhases
Action: create
Status: implemented

[lunarPhases.data.ts](../../data/skills/earthMoonAndSun/lunarAppearance/skills/lunarPhases.data.ts)

Methodological description: Explain the repeating illuminated shapes visible from Earth through the Sun–Moon–observer geometry.
User-friendly description: Explain the changing shape of the sunlit Moon throughout its phases.

##### Lunar Motion

Slug: lunarMotion
Action: create
Status: implemented

[lunarMotion.data.ts](../../data/skills/earthMoonAndSun/lunarAppearance/skills/lunarMotion.data.ts)

Methodological description: Trace the Moon's changing position against background stars across successive nights.
User-friendly description: Track how the Moon changes position against the stars from night to night.

##### Lunar Libration

Slug: lunarLibration
Action: create
Status: implemented

[lunarLibration.data.ts](../../data/skills/earthMoonAndSun/lunarAppearance/skills/lunarLibration.data.ts)

Methodological description: Explain why changing perspective exposes slightly different portions of the lunar surface over time.
User-friendly description: Discover why slightly different parts of the Moon become visible over time.

##### Near and Far Lunar Hemispheres

Slug: nearAndFarLunarHemispheres
Action: create
Status: implemented

[nearAndFarLunarHemispheres.data.ts](../../data/skills/earthMoonAndSun/lunarAppearance/skills/nearAndFarLunarHemispheres.data.ts)

Methodological description: Distinguish the hemisphere generally facing Earth from the opposite hemisphere without equating the far side with permanent darkness.
User-friendly description: Understand why the far side of the Moon is not always dark.

#### Eclipses and Alignments

Slug: eclipsesAndAlignments
Action: create
Status: implemented

Skills: 3

[eclipsesAndAlignments.data.ts](../../data/skills/earthMoonAndSun/eclipsesAndAlignments/eclipsesAndAlignments.data.ts)

Methodological description: Occultation and shadow phenomena depend on an observer's line of sight and the relative positions and apparent sizes of bodies.
User-friendly description: Learn how eclipses depend on the alignment of celestial objects and their shadows.

##### Solar Eclipses

Slug: solarEclipses
Action: create
Status: implemented

[solarEclipses.data.ts](../../data/skills/earthMoonAndSun/eclipsesAndAlignments/skills/solarEclipses.data.ts)

Methodological description: Explain the conditions, shadow regions and different observational appearances of a solar eclipse.
User-friendly description: Explain when a solar eclipse happens and why its appearance varies by location.

##### Lunar Eclipses

Slug: lunarEclipses
Action: create
Status: implemented

[lunarEclipses.data.ts](../../data/skills/earthMoonAndSun/eclipsesAndAlignments/skills/lunarEclipses.data.ts)

Methodological description: Explain the conditions and stages of a lunar eclipse as the Moon encounters Earth's shadow.
User-friendly description: Understand how Earth casts its shadow on the Moon during a lunar eclipse.

##### Eclipse Seasons

Slug: eclipseSeasons
Action: create
Status: implemented

[eclipseSeasons.data.ts](../../data/skills/earthMoonAndSun/eclipsesAndAlignments/skills/eclipseSeasons.data.ts)

Methodological description: Explain why solar and lunar eclipses are not observed at every new or full Moon, using orbital inclination and alignment.
User-friendly description: Discover why a new or full Moon does not produce an eclipse every month.

#### Earth–Moon Interactions

Slug: earthMoonInteractions
Action: create
Status: implemented

Skills: 3

[earthMoonInteractions.data.ts](../../data/skills/earthMoonAndSun/earthMoonInteractions/earthMoonInteractions.data.ts)

Methodological description: The Earth–Moon system is a long-term dynamical pair whose interactions create measurable effects on Earth and its satellite.
User-friendly description: Explore how the Moon and Earth influence each other through gravity.

##### Ocean Tides

Slug: oceanTides
Action: create
Status: implemented

[oceanTides.data.ts](../../data/skills/earthMoonAndSun/earthMoonInteractions/skills/oceanTides.data.ts)

Methodological description: Explain the dominant lunar and solar gravitational contributions to periodic changes in sea level, distinguishing ideal equilibrium tides from local coastal conditions.
User-friendly description: Understand how the Moon and Sun help produce ocean tides.

##### Lunar Tidal Evolution

Slug: lunarTidalEvolution
Action: create
Status: implemented

[lunarTidalEvolution.data.ts](../../data/skills/earthMoonAndSun/earthMoonInteractions/skills/lunarTidalEvolution.data.ts)

Methodological description: Explain how tidal dissipation affects Earth's rotation and the Moon's orbital distance over long timescales.
User-friendly description: See how tidal interactions slowly change Earth's rotation and the Moon's orbit.

##### Lunar Orbit and Month

Slug: lunarOrbitAndMonth
Action: create
Status: implemented

[lunarOrbitAndMonth.data.ts](../../data/skills/earthMoonAndSun/earthMoonInteractions/skills/lunarOrbitAndMonth.data.ts)

Methodological description: Distinguish the Moon's orbital cycle from the phase cycle by considering Earth's simultaneous revolution around the Sun.
User-friendly description: Compare the Moon's journey around Earth with its repeating cycle of phases.

### Solar System Structure and Origins

Slug: solarSystemStructureAndOrigins
Action: create
Status: implemented

Groups: 3 · Skills: 13

[solarSystemStructureAndOrigins.data.ts](../../data/skills/solarSystemStructureAndOrigins/solarSystemStructureAndOrigins.data.ts)

Methodological description: The Solar System is classified by its orbital organization and by evidence of formation from a common disk. Individual worlds are examined in planetary science, while the Sun's internal structure and activity belong to solar astronomy.
User-friendly description: Explore the arrangement of the Solar System and the evidence for how it formed.

#### System Architecture

Slug: systemArchitecture
Action: create
Status: implemented

Skills: 4

[systemArchitecture.data.ts](../../data/skills/solarSystemStructureAndOrigins/systemArchitecture/systemArchitecture.data.ts)

Methodological description: A planetary system includes one or more stars and gravitationally associated objects whose locations are described by nested orbital regions.
User-friendly description: Discover the different regions and kinds of objects orbiting the Sun.

##### Solar System Components

Slug: solarSystemComponents
Action: create
Status: implemented

[solarSystemComponents.data.ts](../../data/skills/solarSystemStructureAndOrigins/systemArchitecture/skills/solarSystemComponents.data.ts)

Methodological description: Classify the Sun, planets, natural satellites and smaller bodies by their roles in the system's gravitational architecture.
User-friendly description: Recognize the Sun, planets, moons and smaller bodies by their roles in the Solar System.

##### Planet and Dwarf Planet Classification

Slug: planetAndDwarfPlanetClassification
Action: create
Status: implemented

[planetAndDwarfPlanetClassification.data.ts](../../data/skills/solarSystemStructureAndOrigins/systemArchitecture/skills/planetAndDwarfPlanetClassification.data.ts)

Methodological description: Apply the physical and dynamical criteria that distinguish planets, dwarf planets and other orbiting bodies.
User-friendly description: Distinguish planets and dwarf planets using their physical and orbital characteristics.

##### Inner and Outer Solar System

Slug: innerAndOuterSolarSystem
Action: create
Status: implemented

[innerAndOuterSolarSystem.data.ts](../../data/skills/solarSystemStructureAndOrigins/systemArchitecture/skills/innerAndOuterSolarSystem.data.ts)

Methodological description: Compare the compositions and environments characteristic of regions on opposite sides of the main asteroid belt, allowing for exceptions.
User-friendly description: Compare the inner and outer Solar System and their typical environments.

##### Small-Body Reservoirs

Slug: smallBodyReservoirs
Action: create
Status: implemented

[smallBodyReservoirs.data.ts](../../data/skills/solarSystemStructureAndOrigins/systemArchitecture/skills/smallBodyReservoirs.data.ts)

Methodological description: Locate and distinguish the asteroid belt, Kuiper Belt and hypothesized Oort Cloud as populations or reservoirs.
User-friendly description: Locate the asteroid belt, Kuiper Belt and proposed distant Oort Cloud.

#### Minor Bodies

Slug: minorBodies
Action: create
Status: implemented

Skills: 4

[minorBodies.data.ts](../../data/skills/solarSystemStructureAndOrigins/minorBodies/minorBodies.data.ts)

Methodological description: Small populations preserve clues about early formation while showing important differences in composition, orbital origin and activity.
User-friendly description: Learn about smaller Solar System bodies and what they reveal about its past.

##### Asteroids

Slug: asteroids
Action: create
Status: implemented

[asteroids.data.ts](../../data/skills/solarSystemStructureAndOrigins/minorBodies/skills/asteroids.data.ts)

Methodological description: Explain the properties, diversity and orbital behavior of predominantly rocky or metallic small Solar System bodies.
User-friendly description: Explore the variety of rocky and metal-rich asteroids and their orbits.

##### Comets

Slug: comets
Action: create
Status: implemented

[comets.data.ts](../../data/skills/solarSystemStructureAndOrigins/minorBodies/skills/comets.data.ts)

Methodological description: Explain the development of a coma and tails as volatile material responds to solar heating and the solar wind.
User-friendly description: Discover how sunlight makes comets develop glowing clouds and tails.

##### Meteoroids, Meteors and Meteorites

Slug: meteoroidsMeteorsAndMeteorites
Action: create
Status: implemented

[meteoroidsMeteorsAndMeteorites.data.ts](../../data/skills/solarSystemStructureAndOrigins/minorBodies/skills/meteoroidsMeteorsAndMeteorites.data.ts)

Methodological description: Distinguish a small body in space, its atmospheric luminous phenomenon and surviving material reaching the ground.
User-friendly description: Distinguish a meteoroid in space, a meteor in the sky and a meteorite on the ground.

##### Trans-Neptunian Objects

Slug: transNeptunianObjects
Action: create
Status: implemented

[transNeptunianObjects.data.ts](../../data/skills/solarSystemStructureAndOrigins/minorBodies/skills/transNeptunianObjects.data.ts)

Methodological description: Classify bodies beyond Neptune and relate their diverse orbits to the outer Solar System.
User-friendly description: Explore the varied objects orbiting beyond Neptune.

#### Formation and Chronology

Slug: formationAndChronology
Action: create
Status: implemented

Skills: 5

[formationAndChronology.data.ts](../../data/skills/solarSystemStructureAndOrigins/formationAndChronology/formationAndChronology.data.ts)

Methodological description: The formation model must explain both shared planetary characteristics and striking differences among observed worlds.
User-friendly description: Trace the evidence for how the Solar System grew and changed over time.

##### Protoplanetary Disks

Slug: protoplanetaryDisks
Action: create
Status: implemented

[protoplanetaryDisks.data.ts](../../data/skills/solarSystemStructureAndOrigins/formationAndChronology/skills/protoplanetaryDisks.data.ts)

Methodological description: Explain the role of rotating gas-and-dust disks in producing material for planet formation.
User-friendly description: See how disks of gas and dust provide the ingredients for forming planets.

##### Planetary Accretion

Slug: planetaryAccretion
Action: create
Status: implemented

[planetaryAccretion.data.ts](../../data/skills/solarSystemStructureAndOrigins/formationAndChronology/skills/planetaryAccretion.data.ts)

Methodological description: Describe how collisions and gravitational growth build larger bodies from smaller solid material.
User-friendly description: Explain how smaller material comes together to build larger planetary bodies.

##### Early Differentiation

Slug: earlyDifferentiation
Action: create
Status: implemented

[earlyDifferentiation.data.ts](../../data/skills/solarSystemStructureAndOrigins/formationAndChronology/skills/earlyDifferentiation.data.ts)

Methodological description: Explain how heating and density sorting lead young planetary bodies to develop distinct interior layers.
User-friendly description: Understand how young worlds develop layers as their materials separate.

##### Age of the Solar System

Slug: ageOfTheSolarSystem
Action: create
Status: implemented

[ageOfTheSolarSystem.data.ts](../../data/skills/solarSystemStructureAndOrigins/formationAndChronology/skills/ageOfTheSolarSystem.data.ts)

Methodological description: Interpret radiometric and meteoritic evidence used to constrain the time of Solar System formation.
User-friendly description: Discover how meteorites and radioactive dating help estimate the Solar System's age.

##### Origin of the Moon

Slug: originOfTheMoon
Action: create
Status: implemented

[originOfTheMoon.data.ts](../../data/skills/solarSystemStructureAndOrigins/formationAndChronology/skills/originOfTheMoon.data.ts)

Methodological description: Evaluate proposed formation scenarios for Earth's Moon, including giant-impact models, using angular momentum, lunar samples, isotopic composition and the limitations of current evidence.
User-friendly description: Compare evidence for different theories of the Moon's origin, including a giant impact.

### Planetary Science

Slug: planetaryScience
Action: create
Status: implemented

Groups: 4 · Skills: 18

[planetaryScience.data.ts](../../data/skills/planetaryScience/planetaryScience.data.ts)

Methodological description: Planetary science compares worlds by their surfaces, interiors, atmospheres and volatile materials. It uses Earth as one comparative case, but its categories also apply to moons, dwarf planets and worlds beyond the Solar System.
User-friendly description: Investigate what worlds are made of and how their surfaces, atmospheres and interiors work.

#### Planetary Classes

Slug: planetaryClasses
Action: create
Status: implemented

Skills: 5

[planetaryClasses.data.ts](../../data/skills/planetaryScience/planetaryClasses/planetaryClasses.data.ts)

Methodological description: Composition, density and thermal history help explain why planets and moons display very different structures rather than simply different sizes.
User-friendly description: Compare rocky worlds, giant planets, moons and other planetary bodies.

##### Terrestrial Planets

Slug: terrestrialPlanets
Action: create
Status: implemented

[terrestrialPlanets.data.ts](../../data/skills/planetaryScience/planetaryClasses/skills/terrestrialPlanets.data.ts)

Methodological description: Compare the characteristic rocky interiors, surfaces and atmospheres of Mercury, Venus, Earth and Mars.
User-friendly description: Explore what makes Mercury, Venus, Earth and Mars rocky planets with different conditions.

##### Giant Planets

Slug: giantPlanets
Action: create
Status: implemented

[giantPlanets.data.ts](../../data/skills/planetaryScience/planetaryClasses/skills/giantPlanets.data.ts)

Methodological description: Distinguish gas giants from ice giants using composition, interior models and observable atmospheric properties.
User-friendly description: Distinguish gas giants and ice giants by their composition and internal structure.

##### Natural Satellites

Slug: naturalSatellites
Action: create
Status: implemented

[naturalSatellites.data.ts](../../data/skills/planetaryScience/planetaryClasses/skills/naturalSatellites.data.ts)

Methodological description: Compare moons by origin, orbit, composition and geological activity without treating all satellites as Moon-like.
User-friendly description: Discover how moons differ in size, origin, composition and activity.

##### Planetary Density and Composition

Slug: planetaryDensityAndComposition
Action: create
Status: implemented

[planetaryDensityAndComposition.data.ts](../../data/skills/planetaryScience/planetaryClasses/skills/planetaryDensityAndComposition.data.ts)

Methodological description: Use mass, radius and density to constrain plausible bulk material and planetary classification.
User-friendly description: Use a world's mass, size and density to reason about what it contains.

##### Planetary Ring Systems

Slug: planetaryRingSystems
Action: create
Status: implemented

[planetaryRingSystems.data.ts](../../data/skills/planetaryScience/planetaryClasses/skills/planetaryRingSystems.data.ts)

Methodological description: Interpret the composition, dynamics, formation and evolution of rings around planets or other bodies, including interactions with nearby satellites and differences between dense rings and diffuse dust populations.
User-friendly description: Explore how planetary rings form, change and interact with nearby moons.

#### Surfaces and Geology

Slug: surfacesAndGeology
Action: create
Status: implemented

Skills: 4

[surfacesAndGeology.data.ts](../../data/skills/planetaryScience/surfacesAndGeology/surfacesAndGeology.data.ts)

Methodological description: Observable terrain records impacts, deformation, volcanism and erosion, with interpretation conditioned by the limits of remote data.
User-friendly description: Read the clues left on planetary surfaces by collisions and geological change.

##### Impact Cratering

Slug: impactCratering
Action: create
Status: implemented

[impactCratering.data.ts](../../data/skills/planetaryScience/surfacesAndGeology/skills/impactCratering.data.ts)

Methodological description: Explain how collisions produce craters and why crater populations can reveal relative surface history.
User-friendly description: Understand how impacts create craters and what crater patterns reveal.

##### Extraterrestrial Volcanism

Slug: extraterrestrialVolcanism
Action: create
Status: implemented

[extraterrestrialVolcanism.data.ts](../../data/skills/planetaryScience/surfacesAndGeology/skills/extraterrestrialVolcanism.data.ts)

Methodological description: Interpret evidence of past or current volcanic processes on planets and moons.
User-friendly description: Look for signs of volcanoes on worlds beyond Earth.

##### Planetary Tectonics

Slug: planetaryTectonics
Action: create
Status: implemented

[planetaryTectonics.data.ts](../../data/skills/planetaryScience/surfacesAndGeology/skills/planetaryTectonics.data.ts)

Methodological description: Compare crustal deformation and tectonic regimes across worlds without assuming Earth-style plate tectonics everywhere.
User-friendly description: Compare how the crusts of different worlds bend, break or move.

##### Surface Age Estimation

Slug: surfaceAgeEstimation
Action: create
Status: implemented

[surfaceAgeEstimation.data.ts](../../data/skills/planetaryScience/surfacesAndGeology/skills/surfaceAgeEstimation.data.ts)

Methodological description: Use relative geologic relationships and calibrated crater statistics to infer the chronology of planetary surfaces.
User-friendly description: Estimate when surfaces formed using geological relationships and impact craters.

#### Atmospheres and Weather

Slug: atmospheresAndWeather
Action: create
Status: implemented

Skills: 4

[atmospheresAndWeather.data.ts](../../data/skills/planetaryScience/atmospheresAndWeather/atmospheresAndWeather.data.ts)

Methodological description: Atmospheric behavior depends on composition, gravity, radiation, pressure and circulation in ways that vary widely from Earth.
User-friendly description: Discover why different planets have very different weather and atmospheres.

##### Atmospheric Retention and Escape

Slug: atmosphericRetentionAndEscape
Action: create
Status: implemented

[atmosphericRetentionAndEscape.data.ts](../../data/skills/planetaryScience/atmospheresAndWeather/skills/atmosphericRetentionAndEscape.data.ts)

Methodological description: Explain how gravity, temperature and escape processes influence the presence or loss of planetary atmospheres.
User-friendly description: Explain why some worlds keep thick atmospheres while others lose gas to space.

##### Planetary Greenhouse Effects

Slug: planetaryGreenhouseEffects
Action: create
Status: implemented

[planetaryGreenhouseEffects.data.ts](../../data/skills/planetaryScience/atmospheresAndWeather/skills/planetaryGreenhouseEffects.data.ts)

Methodological description: Explain how atmospheric absorption and emission influence surface or atmospheric temperatures on different worlds.
User-friendly description: Explore how atmospheric gases trap and release heat on different planets.

##### Planetary Weather

Slug: planetaryWeather
Action: create
Status: implemented

[planetaryWeather.data.ts](../../data/skills/planetaryScience/atmospheresAndWeather/skills/planetaryWeather.data.ts)

Methodological description: Identify and interpret weather phenomena such as storms, clouds and winds under non-Earth conditions.
User-friendly description: Recognize storms, winds and clouds on worlds with conditions unlike Earth's.

##### Atmospheric Circulation

Slug: atmosphericCirculation
Action: create
Status: implemented

[atmosphericCirculation.data.ts](../../data/skills/planetaryScience/atmospheresAndWeather/skills/atmosphericCirculation.data.ts)

Methodological description: Relate global winds and thermal patterns to solar input, rotation and atmospheric structure.
User-friendly description: Understand how a planet's rotation and heating shape large-scale air movement.

#### Interiors and Volatiles

Slug: interiorsAndVolatiles
Action: create
Status: implemented

Skills: 5

[interiorsAndVolatiles.data.ts](../../data/skills/planetaryScience/interiorsAndVolatiles/interiorsAndVolatiles.data.ts)

Methodological description: Indirect observations of magnetic fields, heat and fluid materials constrain unseen layers and possible activity beneath planetary surfaces.
User-friendly description: Investigate hidden planetary layers, magnetic fields, water and ice.

##### Planetary Interior Structure

Slug: planetaryInteriorStructure
Action: create
Status: implemented

[planetaryInteriorStructure.data.ts](../../data/skills/planetaryScience/interiorsAndVolatiles/skills/planetaryInteriorStructure.data.ts)

Methodological description: Infer cores, mantles or other layers from density, seismic, magnetic and gravitational evidence.
User-friendly description: Use indirect evidence to explore a planet's core and interior layers.

##### Planetary Magnetic Fields

Slug: planetaryMagneticFields
Action: create
Status: implemented

[planetaryMagneticFields.data.ts](../../data/skills/planetaryScience/interiorsAndVolatiles/skills/planetaryMagneticFields.data.ts)

Methodological description: Explain the conditions under which internal conductive flows can generate global or regional magnetic fields.
User-friendly description: Explain how moving conductive material inside a planet can create a magnetic field.

##### Water and Ice Beyond Earth

Slug: waterAndIceBeyondEarth
Action: create
Status: implemented

[waterAndIceBeyondEarth.data.ts](../../data/skills/planetaryScience/interiorsAndVolatiles/skills/waterAndIceBeyondEarth.data.ts)

Methodological description: Evaluate the physical states and likely reservoirs of water on different Solar System bodies.
User-friendly description: Explore where water and ice may exist on other worlds.

##### Subsurface Oceans

Slug: subsurfaceOceans
Action: create
Status: implemented

[subsurfaceOceans.data.ts](../../data/skills/planetaryScience/interiorsAndVolatiles/skills/subsurfaceOceans.data.ts)

Methodological description: Interpret geophysical and compositional evidence for liquids beneath icy surfaces without assuming biology.
User-friendly description: Investigate the clues that some icy moons may hide liquid oceans.

##### Cryovolcanism

Slug: cryovolcanism
Action: create
Status: implemented

[cryovolcanism.data.ts](../../data/skills/planetaryScience/interiorsAndVolatiles/skills/cryovolcanism.data.ts)

Methodological description: Recognize and explain eruptions driven by volatile liquids and ices rather than molten rock.
User-friendly description: Discover how cold worlds can erupt icy or volatile materials instead of molten rock.

### Solar Astronomy

Slug: solarAstronomy
Action: create
Status: implemented

Groups: 3 · Skills: 12

[solarAstronomy.data.ts](../../data/skills/solarAstronomy/solarAstronomy.data.ts)

Methodological description: The Sun is examined as a physical star whose radiation, plasma and magnetism affect the Solar System. Stellar populations and the Sun's long-term evolutionary fate are treated in stellar astronomy.
User-friendly description: Study the Sun as a star and explore how its energy and activity influence the Solar System.

#### Solar Structure and Energy

Slug: solarStructureAndEnergy
Action: create
Status: implemented

Skills: 4

[solarStructureAndEnergy.data.ts](../../data/skills/solarAstronomy/solarStructureAndEnergy/solarStructureAndEnergy.data.ts)

Methodological description: Solar radiation originates from processes in the interior and travels outward through distinct plasma and atmospheric regions.
User-friendly description: Learn how energy moves from deep inside the Sun to the space around it.

##### Solar Interior

Slug: solarInterior
Action: create
Status: implemented

[solarInterior.data.ts](../../data/skills/solarAstronomy/solarStructureAndEnergy/skills/solarInterior.data.ts)

Methodological description: Relate the core, radiative zone and convective zone to the transport of energy through the Sun.
User-friendly description: Explore the Sun's internal layers and how they transport energy.

##### Solar Nuclear Fusion

Slug: solarNuclearFusion
Action: create
Status: implemented

[solarNuclearFusion.data.ts](../../data/skills/solarAstronomy/solarStructureAndEnergy/skills/solarNuclearFusion.data.ts)

Methodological description: Explain how hydrogen fusion powers the Sun, distinguishing nuclear reactions from chemical combustion.
User-friendly description: Explain why fusion—not ordinary burning—powers the Sun.

##### Solar Atmosphere

Slug: solarAtmosphere
Action: create
Status: implemented

[solarAtmosphere.data.ts](../../data/skills/solarAstronomy/solarStructureAndEnergy/skills/solarAtmosphere.data.ts)

Methodological description: Distinguish the photosphere, chromosphere and corona by their observational features and physical conditions.
User-friendly description: Recognize the distinct visible and outer layers of the Sun's atmosphere.

##### Solar Luminosity

Slug: solarLuminosity
Action: create
Status: implemented

[solarLuminosity.data.ts](../../data/skills/solarAstronomy/solarStructureAndEnergy/skills/solarLuminosity.data.ts)

Methodological description: Interpret the Sun's total radiant output and its relationship to illumination received at different distances.
User-friendly description: Understand the Sun's total energy output and how received light changes with distance.

#### Magnetic Activity

Slug: magneticActivity
Action: create
Status: implemented

Skills: 4

[magneticActivity.data.ts](../../data/skills/solarAstronomy/magneticActivity/magneticActivity.data.ts)

Methodological description: Magnetic fields in solar plasma produce time-variable surface features and energetic events rather than a perfectly steady star.
User-friendly description: Explore how changing solar magnetic fields produce spots and energetic events.

##### Sunspots

Slug: sunspots
Action: create
Status: implemented

[sunspots.data.ts](../../data/skills/solarAstronomy/magneticActivity/skills/sunspots.data.ts)

Methodological description: Explain the relation between dark solar surface regions, strong magnetic fields and relative temperature.
User-friendly description: Discover why sunspots look darker and how they relate to magnetic fields.

##### Solar Activity Cycle

Slug: solarActivityCycle
Action: create
Status: implemented

[solarActivityCycle.data.ts](../../data/skills/solarAstronomy/magneticActivity/skills/solarActivityCycle.data.ts)

Methodological description: Interpret periodic trends in solar magnetic activity without assuming identical cycles.
User-friendly description: Follow the changing patterns of solar activity without assuming every cycle is identical.

##### Solar Flares

Slug: solarFlares
Action: create
Status: implemented

[solarFlares.data.ts](../../data/skills/solarAstronomy/magneticActivity/skills/solarFlares.data.ts)

Methodological description: Describe rapid magnetic-energy release and its observable radiation signatures.
User-friendly description: Understand how rapid magnetic changes produce solar flares.

##### Coronal Mass Ejections

Slug: coronalMassEjections
Action: create
Status: implemented

[coronalMassEjections.data.ts](../../data/skills/solarAstronomy/magneticActivity/skills/coronalMassEjections.data.ts)

Methodological description: Distinguish large ejections of coronal plasma from flares, including their possible coincidence.
User-friendly description: Distinguish massive eruptions of solar material from bursts of flare radiation.

#### Heliospheric Effects

Slug: heliosphericEffects
Action: create
Status: implemented

Skills: 4

[heliosphericEffects.data.ts](../../data/skills/solarAstronomy/heliosphericEffects/heliosphericEffects.data.ts)

Methodological description: Solar material and magnetic fields extend outward and can influence planetary space environments even far from the solar surface.
User-friendly description: Investigate how the Sun's particles and magnetic fields affect surrounding space.

##### Solar Wind

Slug: solarWind
Action: create
Status: implemented

[solarWind.data.ts](../../data/skills/solarAstronomy/heliosphericEffects/skills/solarWind.data.ts)

Methodological description: Explain the outward flow of charged solar particles and their transport of magnetic fields through space.
User-friendly description: Explore the stream of charged particles flowing outward from the Sun.

##### Heliosphere

Slug: heliosphere
Action: create
Status: implemented

[heliosphere.data.ts](../../data/skills/solarAstronomy/heliosphericEffects/skills/heliosphere.data.ts)

Methodological description: Explain the region dominated by the solar wind and distinguish its boundary from a solid surface.
User-friendly description: Discover the enormous region influenced by the solar wind.

##### Space Weather

Slug: spaceWeather
Action: create
Status: implemented

[spaceWeather.data.ts](../../data/skills/solarAstronomy/heliosphericEffects/skills/spaceWeather.data.ts)

Methodological description: Interpret solar-driven changes that can affect spacecraft, radio systems and near-Earth space without equating them with terrestrial weather.
User-friendly description: Learn how solar activity can disrupt space technology and communications.

##### Auroral Processes

Slug: auroralProcesses
Action: create
Status: implemented

[auroralProcesses.data.ts](../../data/skills/solarAstronomy/heliosphericEffects/skills/auroralProcesses.data.ts)

Methodological description: Explain how energetic charged particles interacting with an atmosphere and magnetic field produce auroral emissions.
User-friendly description: Explain how charged particles and atmospheric gases produce auroras.

### Stellar Properties and Evolution

Slug: stellarPropertiesAndEvolution
Action: create
Status: implemented

Groups: 5 · Skills: 26

[stellarPropertiesAndEvolution.data.ts](../../data/skills/stellarPropertiesAndEvolution/stellarPropertiesAndEvolution.data.ts)

Methodological description: Stars are understood through measurements of their physical properties and models of formation, fusion, change and eventual remnants. The same competencies apply to the Sun where its properties form a useful comparison.
User-friendly description: Explore what stars are like, how they form and how their lives eventually change.

#### Stellar Properties

Slug: stellarProperties
Action: create
Status: implemented

Skills: 5

[stellarProperties.data.ts](../../data/skills/stellarPropertiesAndEvolution/stellarProperties/stellarProperties.data.ts)

Methodological description: Observed spectra and brightness are combined with models to infer physical characteristics that cannot be measured by direct sampling.
User-friendly description: Learn how astronomers measure and infer the physical properties of stars.

##### Stellar Mass

Slug: stellarMass
Action: create
Status: implemented

[stellarMass.data.ts](../../data/skills/stellarPropertiesAndEvolution/stellarProperties/skills/stellarMass.data.ts)

Methodological description: Determine or constrain stellar mass from orbital dynamics or other model-dependent observations.
User-friendly description: Use orbital measurements and models to estimate a star's mass.

##### Stellar Radius

Slug: stellarRadius
Action: create
Status: implemented

[stellarRadius.data.ts](../../data/skills/stellarPropertiesAndEvolution/stellarProperties/skills/stellarRadius.data.ts)

Methodological description: Infer a star's size from luminosity, temperature, eclipses or other relevant evidence.
User-friendly description: Find out how astronomers infer a star's radius from its light and other observations.

##### Stellar Temperature

Slug: stellarTemperature
Action: create
Status: implemented

[stellarTemperature.data.ts](../../data/skills/stellarPropertiesAndEvolution/stellarProperties/skills/stellarTemperature.data.ts)

Methodological description: Explain how stellar spectra and emitted energy distributions constrain effective temperature.
User-friendly description: Use the colors and patterns in starlight to investigate temperature.

##### Stellar Luminosity

Slug: stellarLuminosity
Action: create
Status: implemented

[stellarLuminosity.data.ts](../../data/skills/stellarPropertiesAndEvolution/stellarProperties/skills/stellarLuminosity.data.ts)

Methodological description: Distinguish total emitted power from the light received by an observer and infer luminosity from suitable measurements.
User-friendly description: Distinguish how much energy a star emits from how bright it looks from Earth.

##### Stellar Hydrostatic Equilibrium

Slug: stellarHydrostaticEquilibrium
Action: create
Status: implemented

[stellarHydrostaticEquilibrium.data.ts](../../data/skills/stellarPropertiesAndEvolution/stellarProperties/skills/stellarHydrostaticEquilibrium.data.ts)

Methodological description: Explain how the balance of inward gravitational forces and outward pressure gradients sustains an approximately stable star and how disruption of the balance causes structural changes.
User-friendly description: Understand how gravity and internal pressure keep a star balanced.

#### Stellar and Substellar Classification

Slug: stellarAndSubstellarClassification
Action: create
Status: implemented

Skills: 6

[stellarAndSubstellarClassification.data.ts](../../data/skills/stellarPropertiesAndEvolution/stellarAndSubstellarClassification/stellarAndSubstellarClassification.data.ts)

Methodological description: Spectra, temperature, luminosity, mass, multiplicity and composition provide complementary ways to group luminous stars and related substellar bodies, while observational class need not imply a unique evolutionary history.
User-friendly description: Explore different kinds of stars and related objects through spectra, mass and brightness.

##### Stellar Spectral Types

Slug: stellarSpectralTypes
Action: create
Status: implemented

[stellarSpectralTypes.data.ts](../../data/skills/stellarPropertiesAndEvolution/stellarAndSubstellarClassification/skills/stellarSpectralTypes.data.ts)

Methodological description: Classify stars by temperature-sensitive spectral characteristics rather than by color alone.
User-friendly description: Identify stellar spectral classes using features in their light.

##### Hertzsprung–Russell Diagram

Slug: hertzsprungRussellDiagram
Action: create
Status: implemented

[hertzsprungRussellDiagram.data.ts](../../data/skills/stellarPropertiesAndEvolution/stellarAndSubstellarClassification/skills/hertzsprungRussellDiagram.data.ts)

Methodological description: Interpret the distribution of stars by luminosity and temperature and identify major evolutionary regions.
User-friendly description: Read a Hertzsprung–Russell diagram to compare temperatures, luminosities and stellar stages.

##### Binary and Multiple Stars

Slug: binaryAndMultipleStars
Action: create
Status: implemented

[binaryAndMultipleStars.data.ts](../../data/skills/stellarPropertiesAndEvolution/stellarAndSubstellarClassification/skills/binaryAndMultipleStars.data.ts)

Methodological description: Explain how gravitationally bound stellar systems are identified and used to estimate stellar properties.
User-friendly description: Explore how pairs and groups of stars orbit one another.

##### Stellar Populations

Slug: stellarPopulations
Action: create
Status: implemented

[stellarPopulations.data.ts](../../data/skills/stellarPropertiesAndEvolution/stellarAndSubstellarClassification/skills/stellarPopulations.data.ts)

Methodological description: Distinguish stellar populations by typical ages, chemical abundances and locations without treating the categories as absolute.
User-friendly description: Compare populations of stars with different ages, compositions and locations.

##### Brown Dwarfs

Slug: brownDwarfs
Action: create
Status: implemented

[brownDwarfs.data.ts](../../data/skills/stellarPropertiesAndEvolution/stellarAndSubstellarClassification/skills/brownDwarfs.data.ts)

Methodological description: Distinguish substellar objects below the sustained hydrogen-fusion threshold from stars, including their cooling, atmospheric spectra and uncertain classification near planetary masses.
User-friendly description: Find out how brown dwarfs differ from stars and planetary-mass objects.

##### Variable Stars

Slug: variableStars
Action: create
Status: implemented

[variableStars.data.ts](../../data/skills/stellarPropertiesAndEvolution/stellarAndSubstellarClassification/skills/variableStars.data.ts)

Methodological description: Classify intrinsic stellar brightness variation by physical mechanism, timescale or periodicity, distinguishing it from apparent variation caused by eclipsing companions.
User-friendly description: Recognize different causes of changes in a star's brightness.

#### Star Formation

Slug: starFormation
Action: create
Status: implemented

Skills: 4

[starFormation.data.ts](../../data/skills/stellarPropertiesAndEvolution/starFormation/starFormation.data.ts)

Methodological description: Star birth occurs inside interstellar gas and dust and progresses through distinct gravitational and thermal stages.
User-friendly description: Investigate how stars begin inside large clouds of gas and dust.

##### Molecular Cloud Collapse

Slug: molecularCloudCollapse
Action: create
Status: implemented

[molecularCloudCollapse.data.ts](../../data/skills/stellarPropertiesAndEvolution/starFormation/skills/molecularCloudCollapse.data.ts)

Methodological description: Explain how gravitational collapse of dense gas can initiate star formation against thermal and other support.
User-friendly description: Explain how dense regions of gas can collapse to begin forming stars.

##### Protostars

Slug: protostars
Action: create
Status: implemented

[protostars.data.ts](../../data/skills/stellarPropertiesAndEvolution/starFormation/skills/protostars.data.ts)

Methodological description: Interpret the stage during which a contracting young stellar object has not yet reached stable hydrogen fusion.
User-friendly description: Recognize the early stage of a young star before steady hydrogen fusion begins.

##### Protostellar Disks

Slug: protostellarDisks
Action: create
Status: implemented

[protostellarDisks.data.ts](../../data/skills/stellarPropertiesAndEvolution/starFormation/skills/protostellarDisks.data.ts)

Methodological description: Explain how circumstellar accretion disks transport matter and angular momentum during the early growth of stars.
User-friendly description: Explore how a disk of material feeds a developing star.

##### Protostellar Jets

Slug: protostellarJets
Action: create
Status: implemented

[protostellarJets.data.ts](../../data/skills/stellarPropertiesAndEvolution/starFormation/skills/protostellarJets.data.ts)

Methodological description: Explain the observed collimated outflows from young stellar systems and how their association with disks and magnetic fields constrains star-formation models.
User-friendly description: Learn why young stars may launch narrow jets of moving material.

#### Stellar Evolution

Slug: stellarEvolution
Action: create
Status: implemented

Skills: 5

[stellarEvolution.data.ts](../../data/skills/stellarPropertiesAndEvolution/stellarEvolution/stellarEvolution.data.ts)

Methodological description: Mass and composition strongly constrain the duration and physical stages of a star's nuclear-burning lifetime.
User-friendly description: Discover how stars change as they use up their nuclear fuel.

##### Main Sequence

Slug: mainSequence
Action: create
Status: implemented

[mainSequence.data.ts](../../data/skills/stellarPropertiesAndEvolution/stellarEvolution/skills/mainSequence.data.ts)

Methodological description: Explain why stars can remain in a long-lived core hydrogen-burning state and why mass changes its duration.
User-friendly description: Explain why stars spend much of their lives fusing hydrogen in their cores.

##### Red Giants

Slug: redGiants
Action: create
Status: implemented

[redGiants.data.ts](../../data/skills/stellarPropertiesAndEvolution/stellarEvolution/skills/redGiants.data.ts)

Methodological description: Explain the expansion and cooling of stellar envelopes during post-main-sequence evolution and distinguish the relevant evolutionary paths by progenitor mass.
User-friendly description: Explore how stars expand and cool as they become red giants.

##### Supergiants

Slug: supergiants
Action: create
Status: implemented

[supergiants.data.ts](../../data/skills/stellarPropertiesAndEvolution/stellarEvolution/skills/supergiants.data.ts)

Methodological description: Interpret the very large sizes and high luminosities of massive evolved stars and their connection to advanced stellar evolution and mass loss.
User-friendly description: Recognize the great size and brightness of evolved massive stars.

##### Advanced Stellar Fusion

Slug: advancedStellarFusion
Action: create
Status: implemented

[advancedStellarFusion.data.ts](../../data/skills/stellarPropertiesAndEvolution/stellarEvolution/skills/advancedStellarFusion.data.ts)

Methodological description: Explain how later nuclear-burning stages depend on stellar mass and can create heavier nuclei.
User-friendly description: Discover how some stars fuse heavier elements in later stages of their lives.

##### Stellar Lifetimes

Slug: stellarLifetimes
Action: create
Status: implemented

[stellarLifetimes.data.ts](../../data/skills/stellarPropertiesAndEvolution/stellarEvolution/skills/stellarLifetimes.data.ts)

Methodological description: Compare the evolutionary timescales of stars with different initial masses.
User-friendly description: Compare how long stars live depending on their initial masses.

#### Stellar Remnants

Slug: stellarRemnants
Action: create
Status: implemented

Skills: 6

[stellarRemnants.data.ts](../../data/skills/stellarPropertiesAndEvolution/stellarRemnants/stellarRemnants.data.ts)

Methodological description: The final states of stars differ according to progenitor mass, mass loss and binary interactions; extreme events redistribute energy and elements.
User-friendly description: Explore the compact remains and explosive endings of different kinds of stars.

##### White Dwarfs

Slug: whiteDwarfs
Action: create
Status: implemented

[whiteDwarfs.data.ts](../../data/skills/stellarPropertiesAndEvolution/stellarRemnants/skills/whiteDwarfs.data.ts)

Methodological description: Explain how a compact electron-degeneracy-supported remnant forms after some stars shed their outer layers.
User-friendly description: Understand how some stars leave behind dense white dwarfs.

##### Neutron Stars

Slug: neutronStars
Action: create
Status: implemented

[neutronStars.data.ts](../../data/skills/stellarPropertiesAndEvolution/stellarRemnants/skills/neutronStars.data.ts)

Methodological description: Explain the physical properties and formation of ultra-compact neutron-rich remnants supported by dense matter, including limits imposed by mass and rotation.
User-friendly description: Discover how collapsing stellar cores can form neutron stars.

##### Pulsars

Slug: pulsars
Action: create
Status: implemented

[pulsars.data.ts](../../data/skills/stellarPropertiesAndEvolution/stellarRemnants/skills/pulsars.data.ts)

Methodological description: Interpret periodic electromagnetic pulses as beams from rotating magnetized neutron stars and distinguish an observational pulsar designation from a separate stellar-remnant type.
User-friendly description: Explain why rotating neutron stars can produce regular pulses of radiation.

##### Stellar-Mass Black Holes

Slug: stellarMassBlackHoles
Action: create
Status: implemented

[stellarMassBlackHoles.data.ts](../../data/skills/stellarPropertiesAndEvolution/stellarRemnants/skills/stellarMassBlackHoles.data.ts)

Methodological description: Explain the formation and observational inference of compact remnants with event horizons.
User-friendly description: Explore how stellar-mass black holes form and how astronomers detect their effects.

##### Supernovae

Slug: supernovae
Action: create
Status: implemented

[supernovae.data.ts](../../data/skills/stellarPropertiesAndEvolution/stellarRemnants/skills/supernovae.data.ts)

Methodological description: Distinguish major physical mechanisms that produce stellar explosions and interpret their observational signatures.
User-friendly description: Compare the different processes that produce supernova explosions.

##### Cosmic Element Enrichment

Slug: cosmicElementEnrichment
Action: create
Status: implemented

[cosmicElementEnrichment.data.ts](../../data/skills/stellarPropertiesAndEvolution/stellarRemnants/skills/cosmicElementEnrichment.data.ts)

Methodological description: Explain how stellar nucleosynthesis and explosive or ejective events change the chemical composition of surrounding space.
User-friendly description: See how stars and stellar explosions spread elements into surrounding space.

### Exoplanetary Systems

Slug: exoplanetarySystems
Action: create
Status: implemented

Groups: 3 · Skills: 13

[exoplanetarySystems.data.ts](../../data/skills/exoplanetarySystems/exoplanetarySystems.data.ts)

Methodological description: Planetary systems beyond the Sun provide evidence about the diversity of worlds and formation outcomes. Detection, physical inference and habitability are separated to avoid treating an apparent signal as proof of a specific environment.
User-friendly description: Explore planets beyond our Solar System and what their discoveries reveal about other planetary systems.

#### Exoplanet Detection

Slug: exoplanetDetection
Action: create
Status: implemented

Skills: 4

[exoplanetDetection.data.ts](../../data/skills/exoplanetarySystems/exoplanetDetection/exoplanetDetection.data.ts)

Methodological description: Finding planets around distant stars relies on measured effects and each method has a characteristic sensitivity and ambiguity.
User-friendly description: Discover the methods astronomers use to find planets around distant stars.

##### Transit Detection

Slug: transitDetection
Action: create
Status: implemented

[transitDetection.data.ts](../../data/skills/exoplanetarySystems/exoplanetDetection/skills/transitDetection.data.ts)

Methodological description: Explain how repeated stellar dimming can indicate a planet crossing a star's disk and why geometry matters.
User-friendly description: Recognize how a repeating dip in starlight may reveal a planet passing in front of its star.

##### Radial-Velocity Detection

Slug: radialVelocityDetection
Action: create
Status: implemented

[radialVelocityDetection.data.ts](../../data/skills/exoplanetarySystems/exoplanetDetection/skills/radialVelocityDetection.data.ts)

Methodological description: Interpret periodic stellar spectral shifts as evidence for an orbiting companion and constrain its mass.
User-friendly description: Use a star's changing spectral motion to infer the pull of an orbiting planet.

##### Direct Imaging

Slug: directImaging
Action: create
Status: implemented

[directImaging.data.ts](../../data/skills/exoplanetarySystems/exoplanetDetection/skills/directImaging.data.ts)

Methodological description: Explain when a planet can be resolved separately from its host star and why brightness contrast is challenging.
User-friendly description: Explore why photographing a planet beside its bright host star is difficult.

##### Gravitational Microlensing

Slug: gravitationalMicrolensing
Action: create
Status: implemented

[gravitationalMicrolensing.data.ts](../../data/skills/exoplanetarySystems/exoplanetDetection/skills/gravitationalMicrolensing.data.ts)

Methodological description: Explain how temporary lensing signatures can reveal otherwise difficult-to-detect planetary companions.
User-friendly description: Understand how gravity can briefly magnify a distant star's light and reveal a planet.

#### Exoplanet Characterization

Slug: exoplanetCharacterization
Action: create
Status: implemented

Skills: 5

[exoplanetCharacterization.data.ts](../../data/skills/exoplanetarySystems/exoplanetCharacterization/exoplanetCharacterization.data.ts)

Methodological description: Planet properties are inferred by combining signals and interpreting assumptions, with important differences between measured quantities and theoretical models.
User-friendly description: Learn how researchers infer the properties of exoplanets from indirect observations.

##### Exoplanet Radius

Slug: exoplanetRadius
Action: create
Status: implemented

[exoplanetRadius.data.ts](../../data/skills/exoplanetarySystems/exoplanetCharacterization/skills/exoplanetRadius.data.ts)

Methodological description: Infer a planet's size from transit or other observations and explain its dependence on stellar parameters.
User-friendly description: Estimate a distant planet's size using a transit and information about its star.

##### Exoplanet Mass

Slug: exoplanetMass
Action: create
Status: implemented

[exoplanetMass.data.ts](../../data/skills/exoplanetarySystems/exoplanetCharacterization/skills/exoplanetMass.data.ts)

Methodological description: Infer a planet's mass from orbital effects, including limits set by viewing geometry and models.
User-friendly description: Explore how a planet's gravitational effects help estimate its mass.

##### Exoplanet Bulk Composition

Slug: exoplanetBulkComposition
Action: create
Status: implemented

[exoplanetBulkComposition.data.ts](../../data/skills/exoplanetarySystems/exoplanetCharacterization/skills/exoplanetBulkComposition.data.ts)

Methodological description: Relate a planet's mass-radius behavior to plausible internal materials while recognizing model degeneracy.
User-friendly description: Use mass and radius to investigate possible planetary materials without assuming one answer.

##### Exoplanet Atmospheric Spectra

Slug: exoplanetAtmosphericSpectra
Action: create
Status: implemented

[exoplanetAtmosphericSpectra.data.ts](../../data/skills/exoplanetarySystems/exoplanetCharacterization/skills/exoplanetAtmosphericSpectra.data.ts)

Methodological description: Interpret transit or emission spectra as evidence about atmospheric constituents and conditions.
User-friendly description: See how a planet's spectrum provides clues to its atmosphere.

##### Exoplanet Orbital Properties

Slug: exoplanetOrbitalProperties
Action: create
Status: implemented

[exoplanetOrbitalProperties.data.ts](../../data/skills/exoplanetarySystems/exoplanetCharacterization/skills/exoplanetOrbitalProperties.data.ts)

Methodological description: Infer or compare orbital period, eccentricity and star–planet distance using available data.
User-friendly description: Compare the periods, shapes and sizes of exoplanet orbits.

#### System Diversity

Slug: systemDiversity
Action: create
Status: implemented

Skills: 4

[systemDiversity.data.ts](../../data/skills/exoplanetarySystems/systemDiversity/systemDiversity.data.ts)

Methodological description: Comparing observed systems reveals patterns and exceptions relative to Solar System expectations.
User-friendly description: Discover how planetary systems can differ greatly from our own.

##### Exoplanet System Architectures

Slug: exoplanetSystemArchitectures
Action: create
Status: implemented

[exoplanetSystemArchitectures.data.ts](../../data/skills/exoplanetarySystems/systemDiversity/skills/exoplanetSystemArchitectures.data.ts)

Methodological description: Compare tightly packed, resonant, eccentric and other planetary arrangements using orbital evidence.
User-friendly description: Compare systems with tightly packed planets, unusual orbits or orbital resonances.

##### Planetary Migration

Slug: planetaryMigration
Action: create
Status: implemented

[planetaryMigration.data.ts](../../data/skills/exoplanetarySystems/systemDiversity/skills/planetaryMigration.data.ts)

Methodological description: Explain how interactions with disks or other planets can change orbital locations after formation.
User-friendly description: Explore how planets may move to different orbits after forming.

##### Circumstellar Habitable Zones

Slug: circumstellarHabitableZones
Action: create
Status: implemented

[circumstellarHabitableZones.data.ts](../../data/skills/exoplanetarySystems/systemDiversity/skills/circumstellarHabitableZones.data.ts)

Methodological description: Interpret the range of stellar irradiation permitting surface liquid water under stated atmospheric assumptions.
User-friendly description: Understand what a star's habitable zone does—and does not—tell us about liquid water.

##### Limits of Habitability Indicators

Slug: limitsOfHabitabilityIndicators
Action: create
Status: implemented

[limitsOfHabitabilityIndicators.data.ts](../../data/skills/exoplanetarySystems/systemDiversity/skills/limitsOfHabitabilityIndicators.data.ts)

Methodological description: Evaluate why receiving suitable starlight or being Earth-sized does not establish a habitable world.
User-friendly description: Recognize why an Earth-sized planet in the right orbit is not automatically habitable.

### Interstellar and Galactic Astronomy

Slug: interstellarAndGalacticAstronomy
Action: create
Status: implemented

Groups: 4 · Skills: 16

[interstellarAndGalacticAstronomy.data.ts](../../data/skills/interstellarAndGalacticAstronomy/interstellarAndGalacticAstronomy.data.ts)

Methodological description: This domain investigates matter between stars and the structure, dynamics and transformations of galaxies. The Milky Way is one case, while distant galaxies reveal different environments and stages of evolution.
User-friendly description: Explore the matter between stars and how galaxies form, behave and evolve.

#### Interstellar Matter

Slug: interstellarMatter
Action: create
Status: implemented

Skills: 4

[interstellarMatter.data.ts](../../data/skills/interstellarAndGalacticAstronomy/interstellarMatter/interstellarMatter.data.ts)

Methodological description: Gas, dust, radiation and magnetic fields between stars are active participants in the cycling of matter across galaxies.
User-friendly description: Discover how gas, dust and magnetic fields influence the space between stars.

##### Interstellar Gas

Slug: interstellarGas
Action: create
Status: implemented

[interstellarGas.data.ts](../../data/skills/interstellarAndGalacticAstronomy/interstellarMatter/skills/interstellarGas.data.ts)

Methodological description: Interpret evidence for diffuse ionized, neutral and molecular gas and the conditions associated with these phases.
User-friendly description: Distinguish different forms of gas found between stars.

##### Interstellar Dust

Slug: interstellarDust
Action: create
Status: implemented

[interstellarDust.data.ts](../../data/skills/interstellarAndGalacticAstronomy/interstellarMatter/skills/interstellarDust.data.ts)

Methodological description: Explain extinction, reddening and infrared emission caused by dust along astronomical sightlines.
User-friendly description: See how interstellar dust dims, reddens and re-emits starlight.

##### Nebulae

Slug: nebulae
Action: create
Status: implemented

[nebulae.data.ts](../../data/skills/interstellarAndGalacticAstronomy/interstellarMatter/skills/nebulae.data.ts)

Methodological description: Distinguish emission, reflection and dark nebulae by their observable mechanisms and relation to surrounding light sources.
User-friendly description: Recognize different kinds of nebulae by the way they interact with light.

##### Interstellar Chemical Cycling

Slug: interstellarChemicalCycling
Action: create
Status: implemented

[interstellarChemicalCycling.data.ts](../../data/skills/interstellarAndGalacticAstronomy/interstellarMatter/skills/interstellarChemicalCycling.data.ts)

Methodological description: Explain how stellar outflows and explosive events replenish and alter material available for new star formation.
User-friendly description: Explore how dying stars return material to space for new generations of stars.

#### The Milky Way

Slug: theMilkyWay
Action: create
Status: implemented

Skills: 4

[theMilkyWay.data.ts](../../data/skills/interstellarAndGalacticAstronomy/theMilkyWay/theMilkyWay.data.ts)

Methodological description: Our galaxy is mapped from an interior viewpoint by combining stellar distributions, gas, motions and distance measurements.
User-friendly description: Learn how astronomers map the Milky Way from inside it.

##### Milky Way Structure

Slug: milkyWayStructure
Action: create
Status: implemented

[milkyWayStructure.data.ts](../../data/skills/interstellarAndGalacticAstronomy/theMilkyWay/skills/milkyWayStructure.data.ts)

Methodological description: Interpret the disk, spiral structure, bulge and halo and explain how they are inferred from our position within the galaxy.
User-friendly description: Identify the disk, central bulge and halo of our galaxy.

##### Solar System's Galactic Location

Slug: solarSystemsGalacticLocation
Action: create
Status: implemented

[solarSystemsGalacticLocation.data.ts](../../data/skills/interstellarAndGalacticAstronomy/theMilkyWay/skills/solarSystemsGalacticLocation.data.ts)

Methodological description: Locate the Sun approximately within the Galactic disk, distinguishing its local spiral-arm environment from the Galactic center.
User-friendly description: Locate the Solar System within the Milky Way rather than at its centre.

##### Galactic Rotation

Slug: galacticRotation
Action: create
Status: implemented

[galacticRotation.data.ts](../../data/skills/interstellarAndGalacticAstronomy/theMilkyWay/skills/galacticRotation.data.ts)

Methodological description: Explain how orbital motions and measured velocities reveal the distribution of mass in the Milky Way.
User-friendly description: Use the motion of stars and gas to learn how mass is distributed in our galaxy.

##### Star Clusters

Slug: starClusters
Action: create
Status: implemented

[starClusters.data.ts](../../data/skills/interstellarAndGalacticAstronomy/theMilkyWay/skills/starClusters.data.ts)

Methodological description: Distinguish open and globular clusters by structure, typical populations and galactic environments.
User-friendly description: Compare open and globular star clusters and where they are found.

#### Galaxies and Their Evolution

Slug: galaxiesAndTheirEvolution
Action: create
Status: implemented

Skills: 4

[galaxiesAndTheirEvolution.data.ts](../../data/skills/interstellarAndGalacticAstronomy/galaxiesAndTheirEvolution/galaxiesAndTheirEvolution.data.ts)

Methodological description: Galaxies differ in morphology, stellar content, formation history and interaction, rather than representing fixed shapes throughout cosmic time.
User-friendly description: Explore different galaxy shapes and how galaxies change over time.

##### Galaxy Morphology

Slug: galaxyMorphology
Action: create
Status: implemented

[galaxyMorphology.data.ts](../../data/skills/interstellarAndGalacticAstronomy/galaxiesAndTheirEvolution/skills/galaxyMorphology.data.ts)

Methodological description: Distinguish spiral, elliptical and irregular galaxies while recognizing that visual shape alone does not determine history.
User-friendly description: Recognize spiral, elliptical and irregular galaxies without treating shape as their full history.

##### Galaxy Stellar Populations

Slug: galaxyStellarPopulations
Action: create
Status: implemented

[galaxyStellarPopulations.data.ts](../../data/skills/interstellarAndGalacticAstronomy/galaxiesAndTheirEvolution/skills/galaxyStellarPopulations.data.ts)

Methodological description: Infer differences in star formation and past evolution from stellar colors, spectra and age indicators.
User-friendly description: Use a galaxy's light to infer differences in its stars and star-formation history.

##### Galaxy Interactions and Mergers

Slug: galaxyInteractionsAndMergers
Action: create
Status: implemented

[galaxyInteractionsAndMergers.data.ts](../../data/skills/interstellarAndGalacticAstronomy/galaxiesAndTheirEvolution/skills/galaxyInteractionsAndMergers.data.ts)

Methodological description: Explain how gravitational encounters alter galaxy structures, gas and star formation.
User-friendly description: See how encounters and mergers can reshape galaxies and trigger new stars.

##### Galaxy Groups and Clusters

Slug: galaxyGroupsAndClusters
Action: create
Status: implemented

[galaxyGroupsAndClusters.data.ts](../../data/skills/interstellarAndGalacticAstronomy/galaxiesAndTheirEvolution/skills/galaxyGroupsAndClusters.data.ts)

Methodological description: Interpret gravitationally associated galaxy populations and their larger-scale environments.
User-friendly description: Discover how gravity gathers galaxies into groups and clusters.

#### Active Galactic Nuclei

Slug: activeGalacticNuclei
Action: create
Status: implemented

Skills: 4

[activeGalacticNuclei.data.ts](../../data/skills/interstellarAndGalacticAstronomy/activeGalacticNuclei/activeGalacticNuclei.data.ts)

Methodological description: In some galaxies, accretion onto a central supermassive black hole generates radiation and outflows that differ from normal starlight.
User-friendly description: Investigate galaxy centres where material falling toward black holes generates immense energy.

##### Supermassive Black Holes

Slug: supermassiveBlackHoles
Action: create
Status: implemented

[supermassiveBlackHoles.data.ts](../../data/skills/interstellarAndGalacticAstronomy/activeGalacticNuclei/skills/supermassiveBlackHoles.data.ts)

Methodological description: Interpret evidence for compact massive objects in galaxy centers and their influence on nearby orbits.
User-friendly description: Explore the evidence for massive black holes at the centres of galaxies.

##### Accretion-Powered Emission

Slug: accretionPoweredEmission
Action: create
Status: implemented

[accretionPoweredEmission.data.ts](../../data/skills/interstellarAndGalacticAstronomy/activeGalacticNuclei/skills/accretionPoweredEmission.data.ts)

Methodological description: Explain how infalling material can release substantial radiation before crossing an event horizon.
User-friendly description: Learn how material falling toward a black hole can produce powerful radiation.

##### Quasars

Slug: quasars
Action: create
Status: implemented

[quasars.data.ts](../../data/skills/interstellarAndGalacticAstronomy/activeGalacticNuclei/skills/quasars.data.ts)

Methodological description: Identify quasars as luminous manifestations of active galactic nuclei, including the implications of their cosmological distances.
User-friendly description: Recognize quasars as extremely bright examples of active galactic nuclei.

##### Relativistic Jets

Slug: relativisticJets
Action: create
Status: implemented

[relativisticJets.data.ts](../../data/skills/interstellarAndGalacticAstronomy/activeGalacticNuclei/skills/relativisticJets.data.ts)

Methodological description: Explain the observed collimated outflows in some active galaxies and the role of viewing geometry.
User-friendly description: Explore the narrow, fast-moving jets produced by some active galaxies.

### Cosmology

Slug: cosmology
Action: create
Status: implemented

Groups: 5 · Skills: 17

[cosmology.data.ts](../../data/skills/cosmology/cosmology.data.ts)

Methodological description: Cosmology tests models for the Universe's large-scale composition, history and expansion using observations with known horizons and uncertainties. Unresolved questions must remain distinguishable from established evidence.
User-friendly description: Investigate the Universe's expansion, history and large-scale structure using astronomical evidence.

#### Cosmic Scales

Slug: cosmicScales
Action: create
Status: implemented

Skills: 4

[cosmicScales.data.ts](../../data/skills/cosmology/cosmicScales/cosmicScales.data.ts)

Methodological description: Distances and times become linked by the finite speed of light, which limits how much of the Universe can be observed.
User-friendly description: Explore the immense distances and times involved in observing the cosmos.

##### Observable Universe

Slug: observableUniverse
Action: create
Status: implemented

[observableUniverse.data.ts](../../data/skills/cosmology/cosmicScales/skills/observableUniverse.data.ts)

Methodological description: Distinguish the observable region set by signal travel and cosmic history from claims about the entire Universe.
User-friendly description: Understand why the observable Universe is not necessarily the whole Universe.

##### Lookback Time

Slug: lookbackTime
Action: create
Status: implemented

[lookbackTime.data.ts](../../data/skills/cosmology/cosmicScales/skills/lookbackTime.data.ts)

Methodological description: Explain why distant observations show objects at earlier cosmic epochs.
User-friendly description: Discover why looking farther into space also means looking into the past.

##### Cosmic Distance Measures

Slug: cosmicDistanceMeasures
Action: create
Status: implemented

[cosmicDistanceMeasures.data.ts](../../data/skills/cosmology/cosmicScales/skills/cosmicDistanceMeasures.data.ts)

Methodological description: Distinguish common cosmological distance concepts when relating observed brightness, redshift and scale.
User-friendly description: Compare the different ways cosmologists define and measure distance.

##### Cosmic Horizons

Slug: cosmicHorizons
Action: create
Status: implemented

[cosmicHorizons.data.ts](../../data/skills/cosmology/cosmicScales/skills/cosmicHorizons.data.ts)

Methodological description: Interpret limits on observable or causally connected regions without treating them as physical walls.
User-friendly description: Explore limits on how far signals can reach us or influence other regions.

#### Cosmic Expansion

Slug: cosmicExpansion
Action: create
Status: implemented

Skills: 4

[cosmicExpansion.data.ts](../../data/skills/cosmology/cosmicExpansion/cosmicExpansion.data.ts)

Methodological description: Large-scale redshift patterns support an evolving cosmic geometry, not an ordinary explosion into pre-existing empty space.
User-friendly description: Learn what observations reveal about the expansion of the Universe.

##### Cosmological Redshift

Slug: cosmologicalRedshift
Action: create
Status: implemented

[cosmologicalRedshift.data.ts](../../data/skills/cosmology/cosmicExpansion/skills/cosmologicalRedshift.data.ts)

Methodological description: Explain wavelength stretching associated with the expansion of space, distinguishing it from local Doppler motion.
User-friendly description: Understand how expanding space stretches the wavelengths of travelling light.

##### Hubble–Lemaître Relation

Slug: hubbleLemaitreRelation
Action: create
Status: implemented

[hubbleLemaitreRelation.data.ts](../../data/skills/cosmology/cosmicExpansion/skills/hubbleLemaitreRelation.data.ts)

Methodological description: Relate galaxy recession measurements and distance to empirical evidence for expansion within its domain of applicability.
User-friendly description: Relate measured galaxy distances and redshifts to evidence for cosmic expansion.

##### Expansion Versus Bound Systems

Slug: expansionVersusBoundSystems
Action: create
Status: implemented

[expansionVersusBoundSystems.data.ts](../../data/skills/cosmology/cosmicExpansion/skills/expansionVersusBoundSystems.data.ts)

Methodological description: Explain why the expansion of the Universe does not automatically enlarge gravitationally bound local systems.
User-friendly description: See why expanding space does not simply stretch planets, stars or galaxies apart.

##### Cosmological Models

Slug: cosmologicalModels
Action: create
Status: implemented

[cosmologicalModels.data.ts](../../data/skills/cosmology/cosmicExpansion/skills/cosmologicalModels.data.ts)

Methodological description: Compare the predictions and assumptions of simplified expanding-Universe models against observations.
User-friendly description: Compare models of cosmic expansion with their assumptions and predictions.

#### Early-Universe Models and Evidence

Slug: earlyUniverseModelsAndEvidence
Action: create
Status: implemented

Skills: 4

[earlyUniverseModelsAndEvidence.data.ts](../../data/skills/cosmology/earlyUniverseModelsAndEvidence/earlyUniverseModelsAndEvidence.data.ts)

Methodological description: The early hot and dense Universe is reconstructed from relic radiation, primordial abundances and theoretical models whose predictions and evidence have different degrees of support.
User-friendly description: Explore the evidence used to reconstruct the early, hot Universe.

##### Hot Big Bang Model

Slug: hotBigBangModel
Action: create
Status: implemented

[hotBigBangModel.data.ts](../../data/skills/cosmology/earlyUniverseModelsAndEvidence/skills/hotBigBangModel.data.ts)

Methodological description: Explain the evidence-supported early evolution of the observable Universe without claiming that the model fully explains its ultimate origin.
User-friendly description: Discover what the hot Big Bang model explains—and what it does not establish.

##### Cosmic Microwave Background

Slug: cosmicMicrowaveBackground
Action: create
Status: implemented

[cosmicMicrowaveBackground.data.ts](../../data/skills/cosmology/earlyUniverseModelsAndEvidence/skills/cosmicMicrowaveBackground.data.ts)

Methodological description: Interpret relic microwave radiation and its spatial variations as evidence about the early Universe.
User-friendly description: Investigate the faint microwave glow left from the early Universe.

##### Primordial Nucleosynthesis

Slug: primordialNucleosynthesis
Action: create
Status: implemented

[primordialNucleosynthesis.data.ts](../../data/skills/cosmology/earlyUniverseModelsAndEvidence/skills/primordialNucleosynthesis.data.ts)

Methodological description: Explain the predicted formation of light nuclei and why their observed abundances test early-Universe models.
User-friendly description: See how early-universe models predict the amounts of light elements.

##### Cosmic Inflation

Slug: cosmicInflation
Action: create
Status: implemented

[cosmicInflation.data.ts](../../data/skills/cosmology/earlyUniverseModelsAndEvidence/skills/cosmicInflation.data.ts)

Methodological description: Explain the hypothesized early accelerated-expansion phase, distinguish its predicted consequences from direct observation and evaluate what existing cosmic evidence can and cannot establish.
User-friendly description: Explore the idea of cosmic inflation and distinguish predictions from confirmed evidence.

#### Cosmic Components and Constraints

Slug: cosmicComponentsAndConstraints
Action: create
Status: implemented

Skills: 3

[cosmicComponentsAndConstraints.data.ts](../../data/skills/cosmology/cosmicComponentsAndConstraints/cosmicComponentsAndConstraints.data.ts)

Methodological description: Gravitational and expansion measurements constrain otherwise unseen components, while cosmological parameters and theoretical uncertainties limit the interpretations that can be supported by available evidence.
User-friendly description: Learn how cosmic measurements point to components and questions we cannot yet fully explain.

##### Dark Matter Evidence

Slug: darkMatterEvidence
Action: create
Status: implemented

[darkMatterEvidence.data.ts](../../data/skills/cosmology/cosmicComponentsAndConstraints/skills/darkMatterEvidence.data.ts)

Methodological description: Interpret dynamical, lensing and cosmological evidence for unseen gravitating mass while recognizing remaining theoretical alternatives.
User-friendly description: Explore why astronomers infer unseen matter from gravitational evidence.

##### Dark Energy Evidence

Slug: darkEnergyEvidence
Action: create
Status: implemented

[darkEnergyEvidence.data.ts](../../data/skills/cosmology/cosmicComponentsAndConstraints/skills/darkEnergyEvidence.data.ts)

Methodological description: Explain why observations of accelerated expansion motivate a dark-energy component or changes to gravitational models.
User-friendly description: Examine the evidence that cosmic expansion is accelerating.

##### Limits of Cosmological Knowledge

Slug: limitsOfCosmologicalKnowledge
Action: create
Status: implemented

[limitsOfCosmologicalKnowledge.data.ts](../../data/skills/cosmology/cosmicComponentsAndConstraints/skills/limitsOfCosmologicalKnowledge.data.ts)

Methodological description: Distinguish empirical constraints from open problems concerning early conditions, dark components and the global extent of the Universe.
User-friendly description: Distinguish what observations establish about the Universe from major unanswered questions.

#### Cosmic Structure and Evolution

Slug: cosmicStructureAndEvolution
Action: create
Status: implemented

Skills: 2

[cosmicStructureAndEvolution.data.ts](../../data/skills/cosmology/cosmicStructureAndEvolution/cosmicStructureAndEvolution.data.ts)

Methodological description: Density perturbations, gravity and cosmic expansion shape the cosmic web over time. This branch focuses on spatial organization and dynamical evolution, as distinct from the initial hot state or the physical nature of the Universe's dark components.
User-friendly description: Investigate how gravity shapes matter into large structures over cosmic history.

##### Cosmic Structure Formation

Slug: cosmicStructureFormation
Action: create
Status: implemented

[cosmicStructureFormation.data.ts](../../data/skills/cosmology/cosmicStructureAndEvolution/skills/cosmicStructureFormation.data.ts)

Methodological description: Explain how initially small matter-density differences grow into galaxies and large-scale structure.
User-friendly description: See how tiny early differences in matter density developed into cosmic structure.

##### Cosmic Web

Slug: cosmicWeb
Action: create
Status: implemented

[cosmicWeb.data.ts](../../data/skills/cosmology/cosmicStructureAndEvolution/skills/cosmicWeb.data.ts)

Methodological description: Describe how filaments, clusters and voids trace the large-scale distribution of matter.
User-friendly description: Explore the vast network of galactic filaments, clusters and empty regions.

### Astrobiology

Slug: astrobiology
Action: create
Status: implemented

Groups: 3 · Skills: 12

[astrobiology.data.ts](../../data/skills/astrobiology/astrobiology.data.ts)

Methodological description: Scientific investigation of the possibility, conditions and evidence of life beyond Earth, including chemical origins, habitability and contamination risks. The methods of spacecraft observation are classified with astronomical instrumentation and evidence rather than presented as a separate astrobiological subject.
User-friendly description: Explore what life beyond Earth might require and how scientists could recognize credible evidence of it.

#### Conditions for Life

Slug: conditionsForLife
Action: create
Status: implemented

Skills: 4

[conditionsForLife.data.ts](../../data/skills/astrobiology/conditionsForLife/conditionsForLife.data.ts)

Methodological description: Evaluating environments for life requires explicit biological and geochemical assumptions; familiar Earth conditions are useful evidence, not universal proof.
User-friendly description: Consider the environments and chemistry that might allow life to exist.

##### Habitability

Slug: habitability
Action: create
Status: implemented

[habitability.data.ts](../../data/skills/astrobiology/conditionsForLife/skills/habitability.data.ts)

Methodological description: Evaluate energy sources, chemical building blocks, solvent availability and environmental stability as possible prerequisites for known life.
User-friendly description: Explore the energy, chemistry, liquids and stability that could make an environment habitable.

##### Extremophile Analogues

Slug: extremophileAnalogues
Action: create
Status: implemented

[extremophileAnalogues.data.ts](../../data/skills/astrobiology/conditionsForLife/skills/extremophileAnalogues.data.ts)

Methodological description: Interpret how Earth organisms in extreme environments inform hypotheses about extraterrestrial habitats without proving life exists there.
User-friendly description: Use life's survival in extreme places on Earth to investigate possible extraterrestrial habitats.

##### Prebiotic Chemistry

Slug: prebioticChemistry
Action: create
Status: implemented

[prebioticChemistry.data.ts](../../data/skills/astrobiology/conditionsForLife/skills/prebioticChemistry.data.ts)

Methodological description: Explain plausible nonliving chemical pathways relevant to life's origins while distinguishing hypotheses from established histories.
User-friendly description: Discover how nonliving chemistry might produce ingredients relevant to life's origins.

##### Habitability Through Time

Slug: habitabilityThroughTime
Action: create
Status: implemented

[habitabilityThroughTime.data.ts](../../data/skills/astrobiology/conditionsForLife/skills/habitabilityThroughTime.data.ts)

Methodological description: Assess how a world's environmental history may change its potential to support life.
User-friendly description: Investigate how a world's changing environment affects its potential to support life.

#### Evidence of Life

Slug: evidenceOfLife
Action: create
Status: implemented

Skills: 5

[evidenceOfLife.data.ts](../../data/skills/astrobiology/evidenceOfLife/evidenceOfLife.data.ts)

Methodological description: A proposed sign of life must be weighed against nonbiological processes and the limits of the measuring instrument.
User-friendly description: Learn how to distinguish possible signs of life from nonliving explanations.

##### Biosignatures

Slug: biosignatures
Action: create
Status: implemented

[biosignatures.data.ts](../../data/skills/astrobiology/evidenceOfLife/skills/biosignatures.data.ts)

Methodological description: Evaluate chemical, morphological or other candidate indicators that might be produced by living systems.
User-friendly description: Recognize candidate chemical or physical clues that could be linked to living systems.

##### Abiotic False Positives

Slug: abioticFalsePositives
Action: create
Status: implemented

[abioticFalsePositives.data.ts](../../data/skills/astrobiology/evidenceOfLife/skills/abioticFalsePositives.data.ts)

Methodological description: Identify nonbiological processes capable of producing signals superficially similar to biosignatures.
User-friendly description: Discover how nonliving processes can imitate signs that might suggest life.

##### Life-Detection Evidence Standards

Slug: lifeDetectionEvidenceStandards
Action: create
Status: implemented

[lifeDetectionEvidenceStandards.data.ts](../../data/skills/astrobiology/evidenceOfLife/skills/lifeDetectionEvidenceStandards.data.ts)

Methodological description: Distinguish suggestive observations from convergent, independently checked evidence sufficient to support a life claim.
User-friendly description: Explore why extraordinary claims of extraterrestrial life need multiple independent checks.

##### Technosignatures

Slug: technosignatures
Action: create
Status: implemented

[technosignatures.data.ts](../../data/skills/astrobiology/evidenceOfLife/skills/technosignatures.data.ts)

Methodological description: Interpret possible observable indicators of technology without confusing an unexplained signal with confirmed intelligence.
User-friendly description: Consider what an unusual signal might reveal about technology without calling it proof of intelligence.

##### Planetary Protection

Slug: planetaryProtection
Action: create
Status: implemented

[planetaryProtection.data.ts](../../data/skills/astrobiology/evidenceOfLife/skills/planetaryProtection.data.ts)

Methodological description: Explain why forward and backward biological contamination controls matter for mission science and credible life-detection results.
User-friendly description: Understand why avoiding contamination matters in the search for extraterrestrial life.

#### Search Environments

Slug: searchEnvironments
Action: create
Status: implemented

Skills: 3

[searchEnvironments.data.ts](../../data/skills/astrobiology/searchEnvironments/searchEnvironments.data.ts)

Methodological description: Search strategies differ for nearby worlds whose material can be sampled and distant worlds known mainly through remote measurements.
User-friendly description: Compare scientific methods for searching different worlds and environments for life.

##### Solar System Life Searches

Slug: solarSystemLifeSearches
Action: create
Status: implemented

[solarSystemLifeSearches.data.ts](../../data/skills/astrobiology/searchEnvironments/skills/solarSystemLifeSearches.data.ts)

Methodological description: Compare scientific search approaches for places such as Mars and icy moons using expected environmental indicators.
User-friendly description: Explore how scientists look for signs of habitability or life on Mars and icy moons.

##### Exoplanet Life Searches

Slug: exoplanetLifeSearches
Action: create
Status: implemented

[exoplanetLifeSearches.data.ts](../../data/skills/astrobiology/searchEnvironments/skills/exoplanetLifeSearches.data.ts)

Methodological description: Interpret the capabilities and limitations of remote atmospheric and planetary measurements in searches for life.
User-friendly description: Learn what distant planetary measurements can reveal—and cannot reveal—about possible life.

##### Subsurface Habitats

Slug: subsurfaceHabitats
Action: create
Status: implemented

[subsurfaceHabitats.data.ts](../../data/skills/astrobiology/searchEnvironments/skills/subsurfaceHabitats.data.ts)

Methodological description: Explain why liquid environments protected under ice or rock can be relevant even when a surface is hostile.
User-friendly description: Discover why oceans hidden beneath ice or rock could be promising places to investigate.

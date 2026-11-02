# Physics — Skills Taxonomy

Date: 2026-10-29

**Approved** subject-specific Physics Skills Taxonomy. Each Skill describes an independent physics competency without imposing limits on the depth of mastery, age, Curriculum level, permissible formulas, teaching method, or assessment approach. Different independent curricula may include the same Skill at different depths and in different sequences; no single curriculum sets the boundaries of the subject catalog.

Physics describes the laws governing natural phenomena and explains principles used in technology. Designing, selecting components for, and optimizing devices belong to the Engineering textbook. General scientific methodology belongs to Human and Thinking. Cross-subject references to these topics do not establish shared global Skill IDs.

**Approved subject boundaries:** Mechanics covers the physical principles of simple machines, forces, equilibrium, and structural stability, while the design and optimization of machines and structures belong to Engineering. Waves covers general wave phenomena; Optics covers light propagation and image formation; Radiation covers electromagnetic-spectrum phenomena and interactions with matter; Thermodynamics covers radiative heat transfer alongside conduction and convection. Conservation of linear momentum, angular momentum, and electric charge are placed in their respective subject groups, not in the Energy Domain.

References: [OpenStax University Physics](https://openstax.org/books/university-physics-volume-1/pages/preface), [OpenStax: Wave Interaction](https://openstax.org/books/physics/pages/13-3-wave-interaction-superposition-and-interference), [Studio Subject Proposition](../../../../studio/Subject%20Proposition.md). These materials were used to check subject coverage, not as a ready-made curriculum or a literal structure for Svitlo.

## SUMMARY

Domains: 12
Groups: 48
Skills: 180

Code files: 0/12 Domains · 0/48 Groups · 0/180 Skills

## DOMAINS

### Measurement

Slug: measurement
Action: create
Status: implemented

Groups: 2 · Skills: 7

[measurement.data.ts](../../data/skills/measurement/measurement.data.ts)

Methodological description: Physical measurement connects an observable property to an agreed method of comparison through the choice of quantity, unit, and instrument. Its purpose is to make descriptions of phenomena reproducible without tying them to formulas or mathematics lessons.
User-friendly description: Explore how physicists measure properties using quantities, units and reliable methods.

#### Physical Quantities and Units

Slug: physicalQuantitiesAndUnits
Action: create
Status: implemented

Skills: 4

[physicalQuantitiesAndUnits.data.ts](../../data/skills/measurement/physicalQuantitiesAndUnits/physicalQuantitiesAndUnits.data.ts)

Methodological description: A single object can be described using different quantities; comparisons of the same quantity require compatible units and observation conditions.
User-friendly description: Learn to describe physical properties with appropriate measurements and units.

##### Distinguish a physical quantity from its unit of measurement

Slug: distinguishAPhysicalQuantityFromItsUnitOfMeasurement
Action: create
Status: implemented

[distinguishAPhysicalQuantityFromItsUnitOfMeasurement.data.ts](../../data/skills/measurement/physicalQuantitiesAndUnits/skills/distinguishAPhysicalQuantityFromItsUnitOfMeasurement.data.ts)

Methodological description: A physical quantity describes a property of a body or phenomenon, whereas a unit establishes an agreed scale for expressing it numerically; length and centimeter serve different roles.
User-friendly description: Distinguish the property being measured from the unit used to express it.

##### Select a unit for a familiar physical quantity

Slug: selectAUnitForAFamiliarPhysicalQuantity
Action: create
Status: implemented

[selectAUnitForAFamiliarPhysicalQuantity.data.ts](../../data/skills/measurement/physicalQuantitiesAndUnits/skills/selectAUnitForAFamiliarPhysicalQuantity.data.ts)

Methodological description: Choose appropriate units of time, length, and mass in everyday examples without confusing a physical quantity with an object.
User-friendly description: Choose meaningful measurement units for time, mass and length.

##### Compare measurements of the same quantity

Slug: compareMeasurementsOfTheSameQuantity
Action: create
Status: implemented

[compareMeasurementsOfTheSameQuantity.data.ts](../../data/skills/measurement/physicalQuantitiesAndUnits/skills/compareMeasurementsOfTheSameQuantity.data.ts)

Methodological description: Given consistent units and clearly stated conditions, determine which measured value is larger or smaller; this is physical interpretation, not arithmetic practice.
User-friendly description: Compare measurements made under consistent conditions and units.

##### Explain the physical meaning of a body's mass

Slug: explainThePhysicalMeaningOfABodysMass
Action: create
Status: implemented

[explainThePhysicalMeaningOfABodysMass.data.ts](../../data/skills/measurement/physicalQuantitiesAndUnits/skills/explainThePhysicalMeaningOfABodysMass.data.ts)

Methodological description: Mass characterizes a body's inertia: under the same applied influence, a more massive body is generally harder to change in motion. Mass must not be equated with gravitational force, which can depend on location.
User-friendly description: Understand mass as resistance to changes in motion rather than gravitational force.

#### Instruments and Measurement Methods

Slug: instrumentsAndMeasurementMethods
Action: create
Status: implemented

Skills: 3

[instrumentsAndMeasurementMethods.data.ts](../../data/skills/measurement/instrumentsAndMeasurementMethods/instrumentsAndMeasurementMethods.data.ts)

Methodological description: An instrument's reading depends on its scale, units, and correct use; the method of obtaining data matters as much as the number itself.
User-friendly description: Discover how instruments and careful methods make physical measurements useful.

##### Read temperature from a thermometer

Slug: readTemperatureFromAThermometer
Action: create
Status: implemented

[readTemperatureFromAThermometer.data.ts](../../data/skills/measurement/instrumentsAndMeasurementMethods/skills/readTemperatureFromAThermometer.data.ts)

Methodological description: Relate the position of a pointer or liquid column to the temperature scale and units, accounting for the scale origin and measurement limits.
User-friendly description: Read a thermometer's scale and units to determine temperature.

##### Read a simple measuring instrument

Slug: readASimpleMeasuringInstrument
Action: create
Status: implemented

[readASimpleMeasuringInstrument.data.ts](../../data/skills/measurement/instrumentsAndMeasurementMethods/skills/readASimpleMeasuringInstrument.data.ts)

Methodological description: Correctly relate the measured quantity to the position of a pointer on a scale, its units, and the zero reference; a reading has physical meaning only under the relevant measurement conditions.
User-friendly description: Read an instrument's pointer, scale, unit and zero reference correctly.

##### Explain why repeated measurements may differ

Slug: explainWhyRepeatedMeasurementsMayDiffer
Action: create
Status: implemented

[explainWhyRepeatedMeasurementsMayDiffer.data.ts](../../data/skills/measurement/instrumentsAndMeasurementMethods/skills/explainWhyRepeatedMeasurementsMayDiffer.data.ts)

Methodological description: Repeated measurements can differ because of instrument precision limits, reading methods, or changing conditions; a difference in values does not always mean that the measured phenomenon has changed.
User-friendly description: Explain why repeated readings can differ even when measuring the same object.

### Mechanics

Slug: mechanics
Action: create
Status: implemented

Groups: 6 · Skills: 21

[mechanics.data.ts](../../data/skills/mechanics/mechanics.data.ts)

Methodological description: Mechanics describes changes in bodies' positions over time, the inertial properties of motion, and the transmission of mechanical action through simple systems. Basic explanations of types of forces and equilibrium are assigned to the neighboring Domain.
User-friendly description: Explore how bodies move, resist changes and transfer motion through mechanical systems.

#### Describing Motion

Slug: describingMotion
Action: create
Status: implemented

Skills: 4

[describingMotion.data.ts](../../data/skills/mechanics/describingMotion/describingMotion.data.ts)

Methodological description: Position, direction, speed, and repetition are needed for a qualitative description of a trajectory; motion is always considered relative to a chosen reference.
User-friendly description: Learn to describe where things move and how motion changes with time.

##### Identify motion relative to a reference point

Slug: identifyMotionRelativeToAReferencePoint
Action: create
Status: implemented

[identifyMotionRelativeToAReferencePoint.data.ts](../../data/skills/mechanics/describingMotion/skills/identifyMotionRelativeToAReferencePoint.data.ts)

Methodological description: Motion is a change in a body's position relative to a reference frame over time; an object can move relative to one reference and remain stationary relative to another.
User-friendly description: Explain why an object can move relative to one reference and rest relative to another.

##### Describe the direction of motion

Slug: describeTheDirectionOfMotion
Action: create
Status: implemented

[describeTheDirectionOfMotion.data.ts](../../data/skills/mechanics/describingMotion/skills/describeTheDirectionOfMotion.data.ts)

Methodological description: Determine the direction of a body's velocity or displacement relative to a selected reference frame, distinguishing direction from the total distance traveled.
User-friendly description: Identify the direction of motion from a chosen point of view.

##### Compare speeds of motion

Slug: compareSpeedsOfMotion
Action: create
Status: implemented

[compareSpeedsOfMotion.data.ts](../../data/skills/mechanics/describingMotion/skills/compareSpeedsOfMotion.data.ts)

Methodological description: Speed relates displacement or distance to time; comparisons account for whether the same time intervals or different periods of motion are involved.
User-friendly description: Compare how quickly objects move over specified time intervals.

##### Recognize periodic motion

Slug: recognizePeriodicMotion
Action: create
Status: implemented

[recognizePeriodicMotion.data.ts](../../data/skills/mechanics/describingMotion/skills/recognizePeriodicMotion.data.ts)

Methodological description: Identify recurring physical states and distinguish regular cycles of motion from random or one-time changes in position.
User-friendly description: Recognize motion that repeats in a regular cycle.

#### Inertia and Changes in Motion

Slug: inertiaAndChangesInMotion
Action: create
Status: implemented

Skills: 2

[inertiaAndChangesInMotion.data.ts](../../data/skills/mechanics/inertiaAndChangesInMotion/inertiaAndChangesInMotion.data.ts)

Methodological description: A body may continue moving after an applied action ceases, while changes in motion are associated with interaction; accessible models do not require equations of motion.
User-friendly description: Discover inertia and how it relates to changes in motion.

##### Recognize manifestations of inertia in motion

Slug: recognizeManifestationsOfInertiaInMotion
Action: create
Status: implemented

[recognizeManifestationsOfInertiaInMotion.data.ts](../../data/skills/mechanics/inertiaAndChangesInMotion/skills/recognizeManifestationsOfInertiaInMotion.data.ts)

Methodological description: Explain why an object or passenger tends to maintain its previous state of motion during an abrupt change in speed.
User-friendly description: Explain why moving objects tend to keep moving when conditions suddenly change.

##### Distinguish uniform from nonuniform motion

Slug: distinguishUniformFromNonuniformMotion
Action: create
Status: implemented

[distinguishUniformFromNonuniformMotion.data.ts](../../data/skills/mechanics/inertiaAndChangesInMotion/skills/distinguishUniformFromNonuniformMotion.data.ts)

Methodological description: Compare successive positions of an object to determine whether it travels equal distances in equal time intervals.
User-friendly description: Recognize constant-speed motion and motion that changes over time.

#### Simple Machines

Slug: simpleMachines
Action: create
Status: implemented

Skills: 4

[simpleMachines.data.ts](../../data/skills/mechanics/simpleMachines/simpleMachines.data.ts)

Methodological description: Levers, pulleys, wheels, and gears demonstrate the transmission of force and rotation. The focus here is on physical principles, not selecting a design or engineering a machine.
User-friendly description: Understand how levers, wheels, pulleys and gears transmit motion and force.

##### Explain how a lever works

Slug: explainHowALeverWorks
Action: create
Status: implemented

[explainHowALeverWorks.data.ts](../../data/skills/mechanics/simpleMachines/skills/explainHowALeverWorks.data.ts)

Methodological description: A lever's mechanical advantage depends on distances between the fulcrum and the points where forces are applied; gaining force involves a corresponding change in displacement.
User-friendly description: Explore how a lever changes the relationship between force and distance.

##### Explain how a wheel and axle work

Slug: explainHowAWheelAndAxleWork
Action: create
Status: implemented

[explainHowAWheelAndAxleWork.data.ts](../../data/skills/mechanics/simpleMachines/skills/explainHowAWheelAndAxleWork.data.ts)

Methodological description: The shared rotation of a wheel and axle transmits motion and changes the relationship between applied forces and displacements; a wheel can also change the nature of friction.
User-friendly description: Understand how a wheel and axle transmit rotation and change applied forces.

##### Explain how a pulley works

Slug: explainHowAPulleyWorks
Action: create
Status: implemented

[explainHowAPulleyWorks.data.ts](../../data/skills/mechanics/simpleMachines/skills/explainHowAPulleyWorks.data.ts)

Methodological description: A fixed pulley changes the direction of the applied force, whereas a movable pulley can reduce the force needed by distributing the load across rope segments.
User-friendly description: Compare how fixed and movable pulleys redirect or distribute a load.

##### Predict the rotation of meshed gears

Slug: predictTheRotationOfMeshedGears
Action: create
Status: implemented

[predictTheRotationOfMeshedGears.data.ts](../../data/skills/mechanics/simpleMachines/skills/predictTheRotationOfMeshedGears.data.ts)

Methodological description: A directly meshed pair of gears rotates in opposite directions, and the ratio of their angular velocities depends on the number of teeth.
User-friendly description: Predict how interlocking gears rotate and how their tooth counts affect speed.

#### Newton's Laws

Slug: newtonsLaws
Action: create
Status: implemented

Skills: 3

[newtonsLaws.data.ts](../../data/skills/mechanics/newtonsLaws/newtonsLaws.data.ts)

Methodological description: Newton's laws establish the relationships among forces, inertia, and changes in bodies' motion in the appropriate reference frames.
User-friendly description: Learn how Newton's laws connect forces with changes in motion.

##### Explain Newton's first law

Slug: explainNewtonsFirstLaw
Action: create
Status: implemented

[explainNewtonsFirstLaw.data.ts](../../data/skills/mechanics/newtonsLaws/skills/explainNewtonsFirstLaw.data.ts)

Methodological description: When the net force is zero, a body's velocity in an inertial reference frame remains constant; rest is a special case.
User-friendly description: Explain why zero net force means constant velocity in an inertial frame.

##### Explain Newton's second law

Slug: explainNewtonsSecondLaw
Action: create
Status: implemented

[explainNewtonsSecondLaw.data.ts](../../data/skills/mechanics/newtonsLaws/skills/explainNewtonsSecondLaw.data.ts)

Methodological description: A body's acceleration is determined by the net force and its mass; under the same force, bodies of different masses change velocity differently.
User-friendly description: Explore how force and mass together determine acceleration.

##### Explain Newton's third law

Slug: explainNewtonsThirdLaw
Action: create
Status: implemented

[explainNewtonsThirdLaw.data.ts](../../data/skills/mechanics/newtonsLaws/skills/explainNewtonsThirdLaw.data.ts)

Methodological description: The interaction forces between two bodies are equal in magnitude and opposite in direction but act on different bodies, so they do not cancel on a single body.
User-friendly description: Recognize equal and opposite interaction forces acting on different bodies.

#### Momentum and Collisions

Slug: momentumAndCollisions
Action: create
Status: implemented

Skills: 4

[momentumAndCollisions.data.ts](../../data/skills/mechanics/momentumAndCollisions/momentumAndCollisions.data.ts)

Methodological description: Momentum characterizes a body's motion, while collisions demonstrate momentum transfer and change. In the absence of external impulse, the total momentum of a system is conserved regardless of the type of collision.
User-friendly description: Discover how moving bodies exchange momentum during collisions.

##### Explain linear momentum

Slug: explainLinearMomentum
Action: create
Status: implemented

[explainLinearMomentum.data.ts](../../data/skills/mechanics/momentumAndCollisions/skills/explainLinearMomentum.data.ts)

Methodological description: Momentum depends on a body's mass and velocity and has a direction; equal velocities of bodies with different masses do not imply equal momentum.
User-friendly description: Explain how momentum depends on mass, velocity and direction.

##### Explain impulse

Slug: explainImpulse
Action: create
Status: implemented

[explainImpulse.data.ts](../../data/skills/mechanics/momentumAndCollisions/skills/explainImpulse.data.ts)

Methodological description: A change in a body's momentum is related to the magnitude and duration of an applied force, which explains physical differences among braking methods.
User-friendly description: Explore how a force acting over time changes momentum.

##### Distinguish elastic from inelastic collisions

Slug: distinguishElasticFromInelasticCollisions
Action: create
Status: implemented

[distinguishElasticFromInelasticCollisions.data.ts](../../data/skills/mechanics/momentumAndCollisions/skills/distinguishElasticFromInelasticCollisions.data.ts)

Methodological description: In an elastic collision, the system's kinetic energy is conserved; in an inelastic collision, some becomes internal energy and deformation. Momentum remains conserved in an isolated system.
User-friendly description: Compare elastic and inelastic collisions without confusing energy with momentum conservation.

##### Explain conservation of linear momentum

Slug: explainConservationOfLinearMomentum
Action: create
Status: implemented

[explainConservationOfLinearMomentum.data.ts](../../data/skills/mechanics/momentumAndCollisions/skills/explainConservationOfLinearMomentum.data.ts)

Methodological description: In the absence of a net external impulse, the total momentum of a system remains constant even though individual bodies change their momenta.
User-friendly description: Understand why total momentum remains constant without external impulse.

#### Rotational Motion

Slug: rotationalMotion
Action: create
Status: implemented

Skills: 4

[rotationalMotion.data.ts](../../data/skills/mechanics/rotationalMotion/rotationalMotion.data.ts)

Methodological description: Rotation involves torque, mass distribution, and inertial properties. Conservation of angular momentum describes a system's motion when there is no net external torque.
User-friendly description: Explore how turning forces and mass distribution affect rotational motion.

##### Explain torque

Slug: explainTorque
Action: create
Status: implemented

[explainTorque.data.ts](../../data/skills/mechanics/rotationalMotion/skills/explainTorque.data.ts)

Methodological description: The turning effect of a force depends on its direction and lever arm relative to the axis, not merely on the force's magnitude.
User-friendly description: Explain why the same force can turn an object differently depending on its lever arm.

##### Explain rotational inertia

Slug: explainRotationalInertia
Action: create
Status: implemented

[explainRotationalInertia.data.ts](../../data/skills/mechanics/rotationalMotion/skills/explainRotationalInertia.data.ts)

Methodological description: The distribution of mass relative to an axis affects how rotation changes, even when the total mass is the same.
User-friendly description: Recognize how mass farther from an axis changes resistance to rotation.

##### Distinguish rotation about an axis from motion along a circle

Slug: distinguishRotationAboutAnAxisFromMotionAlongACircle
Action: create
Status: implemented

[distinguishRotationAboutAnAxisFromMotionAlongACircle.data.ts](../../data/skills/mechanics/rotationalMotion/skills/distinguishRotationAboutAnAxisFromMotionAlongACircle.data.ts)

Methodological description: A body's rotation about its own axis differs from the motion of its center along a circular path, during which the direction of velocity changes.
User-friendly description: Distinguish an object spinning on an axis from traveling along a circular path.

##### Explain conservation of angular momentum

Slug: explainConservationOfAngularMomentum
Action: create
Status: implemented

[explainConservationOfAngularMomentum.data.ts](../../data/skills/mechanics/rotationalMotion/skills/explainConservationOfAngularMomentum.data.ts)

Methodological description: In the absence of net external torque, a system's total angular momentum is conserved.
User-friendly description: Understand why angular momentum stays constant without net external torque.

### Forces and Interactions

Slug: forcesAndInteractions
Action: create
Status: implemented

Groups: 3 · Skills: 14

[forcesAndInteractions.data.ts](../../data/skills/forcesAndInteractions/forcesAndInteractions.data.ts)

Methodological description: When bodies touch or affect one another at a distance, their motion, shape, or state of equilibrium may change. This Domain covers general concepts of force, contact, gravity, and stability; specifically magnetic and electric phenomena belong to Electromagnetism.
User-friendly description: Discover how forces change motion, deform objects and maintain stability.

#### Contact Forces and Friction

Slug: contactForcesAndFriction
Action: create
Status: implemented

Skills: 5

[contactForcesAndFriction.data.ts](../../data/skills/forcesAndInteractions/contactForcesAndFriction/contactForcesAndFriction.data.ts)

Methodological description: Contact can produce pushing, pulling, and friction; the direction of interaction and surface properties affect motion.
User-friendly description: Explore how pushing, pulling and friction affect contacting objects.

##### Recognize pushing forces

Slug: recognizePushingForces
Action: create
Status: implemented

[recognizePushingForces.data.ts](../../data/skills/forcesAndInteractions/contactForcesAndFriction/skills/recognizePushingForces.data.ts)

Methodological description: A contact push transfers force from the acting body in the direction of pressure on another body; not every change in motion is caused by pushing.
User-friendly description: Recognize how one body pushes another through direct contact.

##### Recognize pulling forces

Slug: recognizePullingForces
Action: create
Status: implemented

[recognizePullingForces.data.ts](../../data/skills/forcesAndInteractions/contactForcesAndFriction/skills/recognizePullingForces.data.ts)

Methodological description: Pulling is a contact interaction through a connection or grip, with force directed toward its source; it differs from pressure and pushing.
User-friendly description: Recognize a pulling force and the connection through which it acts.

##### Predict the effect of force direction

Slug: predictTheEffectOfForceDirection
Action: create
Status: implemented

[predictTheEffectOfForceDirection.data.ts](../../data/skills/forcesAndInteractions/contactForcesAndFriction/skills/predictTheEffectOfForceDirection.data.ts)

Methodological description: The direction of the net force relative to velocity determines whether motion speeds up, slows down, or changes direction.
User-friendly description: Predict how force direction affects speeding up, slowing down or turning.

##### Compare motion on different surfaces

Slug: compareMotionOnDifferentSurfaces
Action: create
Status: implemented

[compareMotionOnDifferentSurfaces.data.ts](../../data/skills/forcesAndInteractions/contactForcesAndFriction/skills/compareMotionOnDifferentSurfaces.data.ts)

Methodological description: Interactions between contacting surfaces affect friction and resistance to sliding or rolling, changing mechanical motion under otherwise similar conditions.
User-friendly description: Compare motion on different surfaces by considering friction.

##### Explain the role of friction in stopping

Slug: explainTheRoleOfFrictionInStopping
Action: create
Status: implemented

[explainTheRoleOfFrictionInStopping.data.ts](../../data/skills/forcesAndInteractions/contactForcesAndFriction/skills/explainTheRoleOfFrictionInStopping.data.ts)

Methodological description: Friction during sliding or rolling can reduce kinetic energy of motion, converting it into the internal energy of the bodies and surroundings.
User-friendly description: Explain how friction slows motion and transfers energy into the surroundings.

#### Equilibrium and Stability

Slug: equilibriumAndStability
Action: create
Status: implemented

Skills: 6

[equilibriumAndStability.data.ts](../../data/skills/forcesAndInteractions/equilibriumAndStability/equilibriumAndStability.data.ts)

Methodological description: Balanced forces allow a body to remain at rest, while the arrangement of supports and loads affects a model's stability and deformation.
User-friendly description: Understand the forces that keep structures balanced and stable.

##### Recognize balanced forces

Slug: recognizeBalancedForces
Action: create
Status: implemented

[recognizeBalancedForces.data.ts](../../data/skills/forcesAndInteractions/equilibriumAndStability/skills/recognizeBalancedForces.data.ts)

Methodological description: When the net force is zero, there is no acceleration; a body may be at rest or continue moving uniformly in a straight line.
User-friendly description: Recognize that balanced forces cause no acceleration, even in a moving object.

##### Identify structural support elements

Slug: identifyStructuralSupportElements
Action: create
Status: implemented

[identifyStructuralSupportElements.data.ts](../../data/skills/forcesAndInteractions/equilibriumAndStability/skills/identifyStructuralSupportElements.data.ts)

Methodological description: Identify the elements supporting a model bridge or building.
User-friendly description: Identify the parts that support the weight of a model structure.

##### Predict structural stability

Slug: predictStructuralStability
Action: create
Status: implemented

[predictStructuralStability.data.ts](../../data/skills/forcesAndInteractions/equilibriumAndStability/skills/predictStructuralStability.data.ts)

Methodological description: Compare the stability of two models using basic support-related characteristics.
User-friendly description: Compare which supported structures are more likely to remain stable.

##### Explain load transfer

Slug: explainLoadTransfer
Action: create
Status: implemented

[explainLoadTransfer.data.ts](../../data/skills/forcesAndInteractions/equilibriumAndStability/skills/explainLoadTransfer.data.ts)

Methodological description: Identify how forces from a load pass through structural elements to supports, and distinguish the force-transmission path from the shape of the structure.
User-friendly description: Trace how a load's force passes through structural parts to their supports.

##### Compare the strength of structural shapes

Slug: compareTheStrengthOfStructuralShapes
Action: create
Status: implemented

[compareTheStrengthOfStructuralShapes.data.ts](../../data/skills/forcesAndInteractions/equilibriumAndStability/skills/compareTheStrengthOfStructuralShapes.data.ts)

Methodological description: Under identical testing conditions, determine which shape better withstands a load.
User-friendly description: Compare how differently shaped structures resist the same applied load.

##### Predict the effect of center-of-mass position on stability

Slug: predictTheEffectOfCenterOfMassPositionOnStability
Action: create
Status: implemented

[predictTheEffectOfCenterOfMassPositionOnStability.data.ts](../../data/skills/forcesAndInteractions/equilibriumAndStability/skills/predictTheEffectOfCenterOfMassPositionOnStability.data.ts)

Methodological description: The position of the center of mass relative to the support area affects whether a body can overturn under gravity.
User-friendly description: Predict when the center of mass makes an object more likely to tip.

#### Gravity

Slug: gravity
Action: create
Status: implemented

Skills: 3

[gravity.data.ts](../../data/skills/forcesAndInteractions/gravity/gravity.data.ts)

Methodological description: Bodies with mass interact gravitationally even without touching. Earth's gravity governs falling near its surface, and other celestial bodies also exert gravitational influence.
User-friendly description: Explore gravity as an interaction between bodies with mass.

##### Predict the direction of falling

Slug: predictTheDirectionOfFalling
Action: create
Status: implemented

[predictTheDirectionOfFalling.data.ts](../../data/skills/forcesAndInteractions/gravity/skills/predictTheDirectionOfFalling.data.ts)

Methodological description: Near Earth's surface, gravity acts approximately toward Earth's center, so a body in free fall accelerates downward relative to the local vertical.
User-friendly description: Predict the direction in which gravity accelerates a freely falling object.

##### Distinguish a body's mass from Earth's gravitational force

Slug: distinguishABodysMassFromEarthsGravitationalForce
Action: create
Status: implemented

[distinguishABodysMassFromEarthsGravitationalForce.data.ts](../../data/skills/forcesAndInteractions/gravity/skills/distinguishABodysMassFromEarthsGravitationalForce.data.ts)

Methodological description: Compare a body's unchanged mass with gravitational force, which depends on the gravitational field, using models. Do not equate these quantities or confuse gravitational force with the body's weight as the force it exerts on a support.
User-friendly description: Distinguish an object's mass from the gravitational force acting on it.

##### Explain Earth's gravitational force on a body

Slug: explainEarthsGravitationalForceOnABody
Action: create
Status: implemented

[explainEarthsGravitationalForceOnABody.data.ts](../../data/skills/forcesAndInteractions/gravity/skills/explainEarthsGravitationalForceOnABody.data.ts)

Methodological description: Earth exerts a gravitational force on a body depending on the body's mass and the gravitational field; distinguish that force from mass and from weight as the body's action on a support.
User-friendly description: Understand why Earth's gravity exerts force on an object.

### Fluid Mechanics

Slug: fluidMechanics
Action: create
Status: implemented

Groups: 4 · Skills: 15

[fluidMechanics.data.ts](../../data/skills/fluidMechanics/fluidMechanics.data.ts)

Methodological description: Water and air transmit pressure, flow, resist bodies' motion, and can provide buoyancy. Familiar containers, floating objects, and airflow make these phenomena accessible.
User-friendly description: Explore how liquids and gases flow, exert pressure and support moving bodies.

#### Pressure in Liquids and Gases

Slug: pressureInLiquidsAndGases
Action: create
Status: implemented

Skills: 4

[pressureInLiquidsAndGases.data.ts](../../data/skills/fluidMechanics/pressureInLiquidsAndGases/pressureInLiquidsAndGases.data.ts)

Methodological description: Pressure is transmitted through a medium and changes with depth in still water; container examples help distinguish pressure from the mere amount of water.
User-friendly description: Discover how liquid and gas pressure acts and changes with conditions.

##### Explain why water pressure increases with depth

Slug: explainWhyWaterPressureIncreasesWithDepth
Action: create
Status: implemented

[explainWhyWaterPressureIncreasesWithDepth.data.ts](../../data/skills/fluidMechanics/pressureInLiquidsAndGases/skills/explainWhyWaterPressureIncreasesWithDepth.data.ts)

Methodological description: In a stationary liquid of constant density, pressure increases with depth because of the weight of the layers above; the container's shape alone does not determine it.
User-friendly description: Explain why still water exerts greater pressure at greater depth.

##### Recognize liquid pressure acting in different directions

Slug: recognizeLiquidPressureActingInDifferentDirections
Action: create
Status: implemented

[recognizeLiquidPressureActingInDifferentDirections.data.ts](../../data/skills/fluidMechanics/pressureInLiquidsAndGases/skills/recognizeLiquidPressureActingInDifferentDirections.data.ts)

Methodological description: Use a model of holes in a container to explain why water exerts pressure in directions other than downward.
User-friendly description: Recognize that liquid pressure acts sideways as well as downward.

##### Identify gas pressure in examples

Slug: identifyGasPressureInExamples
Action: create
Status: implemented

[identifyGasPressureInExamples.data.ts](../../data/skills/fluidMechanics/pressureInLiquidsAndGases/skills/identifyGasPressureInExamples.data.ts)

Methodological description: A gas acts on surfaces through collisions of its particles; pressure depends on the gas's physical state and the conditions of its confinement.
User-friendly description: Identify how confined gas exerts pressure on surrounding surfaces.

##### Explain pressure transmission in an enclosed liquid

Slug: explainPressureTransmissionInAnEnclosedLiquid
Action: create
Status: implemented

[explainPressureTransmissionInAnEnclosedLiquid.data.ts](../../data/skills/fluidMechanics/pressureInLiquidsAndGases/skills/explainPressureTransmissionInAnEnclosedLiquid.data.ts)

Methodological description: A pressure change applied to an enclosed liquid at rest is transmitted in every direction, unlike the variation of hydrostatic pressure with depth.
User-friendly description: Explain how changes in pressure travel through an enclosed liquid.

#### Floating and Buoyancy

Slug: floatingAndBuoyancy
Action: create
Status: implemented

Skills: 5

[floatingAndBuoyancy.data.ts](../../data/skills/fluidMechanics/floatingAndBuoyancy/floatingAndBuoyancy.data.ts)

Methodological description: A body's behavior in water is determined by gravity together with forces exerted by the liquid; material and shape may affect the outcome through average density.
User-friendly description: Explore how density and buoyancy determine whether objects float or sink.

##### Distinguish rising, floating, and sinking

Slug: distinguishRisingFloatingAndSinking
Action: create
Status: implemented

[distinguishRisingFloatingAndSinking.data.ts](../../data/skills/fluidMechanics/floatingAndBuoyancy/skills/distinguishRisingFloatingAndSinking.data.ts)

Methodological description: Identify three possible behaviors of safe objects in water through observation or simulation.
User-friendly description: Distinguish an object rising, remaining afloat or sinking in water.

##### Predict how a load affects floating

Slug: predictHowALoadAffectsFloating
Action: create
Status: implemented

[predictHowALoadAffectsFloating.data.ts](../../data/skills/fluidMechanics/floatingAndBuoyancy/skills/predictHowALoadAffectsFloating.data.ts)

Methodological description: Increasing the mass of a load changes the buoyant force and displaced volume needed for equilibrium, so a body may become more deeply submerged.
User-friendly description: Predict how extra weight changes how deeply a floating object sits in water.

##### Explain density

Slug: explainDensity
Action: create
Status: implemented

[explainDensity.data.ts](../../data/skills/fluidMechanics/floatingAndBuoyancy/skills/explainDensity.data.ts)

Methodological description: Density is the mass per unit volume of a substance and helps determine the relationship between a body's properties and those of the surrounding medium.
User-friendly description: Understand density as the amount of mass in a given volume.

##### Explain buoyant force

Slug: explainBuoyantForce
Action: create
Status: implemented

[explainBuoyantForce.data.ts](../../data/skills/fluidMechanics/floatingAndBuoyancy/skills/explainBuoyantForce.data.ts)

Methodological description: The pressure difference exerted by a liquid or gas on a submerged body produces a net upward force.
User-friendly description: Explain how pressure differences create an upward buoyant force.

##### Explain Archimedes' principle

Slug: explainArchimedesPrinciple
Action: create
Status: implemented

[explainArchimedesPrinciple.data.ts](../../data/skills/fluidMechanics/floatingAndBuoyancy/skills/explainArchimedesPrinciple.data.ts)

Methodological description: Under the relevant conditions, the buoyant force equals the weight of the volume of liquid or gas displaced by the body.
User-friendly description: Use Archimedes' principle to relate buoyant force to displaced fluid.

#### Aerodynamics

Slug: aerodynamics
Action: create
Status: implemented

Skills: 3

[aerodynamics.data.ts](../../data/skills/fluidMechanics/aerodynamics/aerodynamics.data.ts)

Methodological description: Air exerts drag on moving bodies; shape and relative speed affect the interaction. Building aircraft or designing hulls are Engineering applications.
User-friendly description: Discover how air influences bodies moving through it.

##### Predict the effect of shape on motion through air

Slug: predictTheEffectOfShapeOnMotionThroughAir
Action: create
Status: implemented

[predictTheEffectOfShapeOnMotionThroughAir.data.ts](../../data/skills/fluidMechanics/aerodynamics/skills/predictTheEffectOfShapeOnMotionThroughAir.data.ts)

Methodological description: A body's shape and orientation affect airflow around it, drag, and, under certain conditions, lift.
User-friendly description: Predict how an object's shape or angle changes drag and lift.

##### Explain the origin of air resistance during motion

Slug: explainTheOriginOfAirResistanceDuringMotion
Action: create
Status: implemented

[explainTheOriginOfAirResistanceDuringMotion.data.ts](../../data/skills/fluidMechanics/aerodynamics/skills/explainTheOriginOfAirResistanceDuringMotion.data.ts)

Methodological description: Using a paper sheet or ball, connect drag to the body's interaction with air; do not claim that drag arises only from an unsuitable shape.
User-friendly description: Explain why moving through air causes resistance.

##### Explain aerodynamic lift

Slug: explainAerodynamicLift
Action: create
Status: implemented

[explainAerodynamicLift.data.ts](../../data/skills/fluidMechanics/aerodynamics/skills/explainAerodynamicLift.data.ts)

Methodological description: Airflow interacting with a body can produce a force perpendicular to the flow; it should not be explained solely by differences in air-path length.
User-friendly description: Explore how airflow can produce lift without relying on a false equal-path explanation.

#### Hydrodynamics

Slug: hydrodynamics
Action: create
Status: implemented

Skills: 3

[hydrodynamics.data.ts](../../data/skills/fluidMechanics/hydrodynamics/hydrodynamics.data.ts)

Methodological description: Water and other liquids flow under certain conditions and resist bodies moving through the stream; comparison with air explains differences between the media.
User-friendly description: Understand how water flows and resists objects moving through it.

##### Compare resistance to motion in water and air

Slug: compareResistanceToMotionInWaterAndAir
Action: create
Status: implemented

[compareResistanceToMotionInWaterAndAir.data.ts](../../data/skills/fluidMechanics/hydrodynamics/skills/compareResistanceToMotionInWaterAndAir.data.ts)

Methodological description: Use qualitative examples to recognize why moving the same object through water and through air feels different.
User-friendly description: Compare resistance experienced by the same object in water and air.

##### Explain water flow between containers at different levels

Slug: explainWaterFlowBetweenContainersAtDifferentLevels
Action: create
Status: implemented

[explainWaterFlowBetweenContainersAtDifferentLevels.data.ts](../../data/skills/fluidMechanics/hydrodynamics/skills/explainWaterFlowBetweenContainersAtDifferentLevels.data.ts)

Methodological description: A hydrostatic pressure difference between connected vessels causes liquid to flow until pressures balance or other forces intervene.
User-friendly description: Explain why water moves between vessels at different levels.

##### Explain continuity of incompressible-fluid flow

Slug: explainContinuityOfIncompressibleFluidFlow
Action: create
Status: implemented

[explainContinuityOfIncompressibleFluidFlow.data.ts](../../data/skills/fluidMechanics/hydrodynamics/skills/explainContinuityOfIncompressibleFluidFlow.data.ts)

Methodological description: For steady flow without leakage, a change in a channel's cross-sectional area is associated with a change in fluid speed.
User-friendly description: Connect changes in channel width with the speed of steady incompressible flow.

### Energy

Slug: energy
Action: create
Status: implemented

Groups: 4 · Skills: 12

[energy.data.ts](../../data/skills/energy/energy.data.ts)

Methodological description: Energy is a quantity that helps describe physical changes and connect phenomena involving motion, heating, light, and electricity. The emphasis is on energy transfer, transformation, and conservation rather than arithmetic formulas.
User-friendly description: Explore how energy is stored, transferred, transformed and conserved in physical systems.

#### Forms of Energy

Slug: formsOfEnergy
Action: create
Status: implemented

Skills: 5

[formsOfEnergy.data.ts](../../data/skills/energy/formsOfEnergy/formsOfEnergy.data.ts)

Methodological description: Motion, position, deformation, and internal state can be associated with different forms of energy; descriptions should refer to a specific physical system.
User-friendly description: Recognize different forms of energy in changing physical situations.

##### Classify forms of energy

Slug: classifyFormsOfEnergy
Action: create
Status: implemented

[classifyFormsOfEnergy.data.ts](../../data/skills/energy/formsOfEnergy/skills/classifyFormsOfEnergy.data.ts)

Methodological description: Distinguish energy of motion, energy related to bodies' positions, elastic deformation energy, and internal energy based on the physical properties of a system.
User-friendly description: Distinguish energy of motion, position, deformation and internal state.

##### Distinguish energy from its source

Slug: distinguishEnergyFromItsSource
Action: create
Status: implemented

[distinguishEnergyFromItsSource.data.ts](../../data/skills/energy/formsOfEnergy/skills/distinguishEnergyFromItsSource.data.ts)

Methodological description: Energy characterizes the state and changes of a system, whereas a source is a body or process from which energy is transferred to another system; the source does not create it from nothing.
User-friendly description: Separate the energy of a system from the source transferring it.

##### Explain kinetic energy as energy of motion

Slug: explainKineticEnergyAsEnergyOfMotion
Action: create
Status: implemented

[explainKineticEnergyAsEnergyOfMotion.data.ts](../../data/skills/energy/formsOfEnergy/skills/explainKineticEnergyAsEnergyOfMotion.data.ts)

Methodological description: Kinetic energy is associated with a body's motion relative to a reference frame and depends on mass and speed, but it is not the same as momentum.
User-friendly description: Explain how a moving body's mass and speed affect its kinetic energy.

##### Explain potential energy

Slug: explainPotentialEnergy
Action: create
Status: implemented

[explainPotentialEnergy.data.ts](../../data/skills/energy/formsOfEnergy/skills/explainPotentialEnergy.data.ts)

Methodological description: Potential energy is related to a physical system's configuration and interactions among its components, including bodies' positions in a gravitational field or elastic deformation. Its value is specified relative to a chosen zero level; this competency addresses physical meaning rather than calculation.
User-friendly description: Understand potential energy as related to configuration and a chosen reference level.

##### Calculate gravitational potential energy

Slug: calculateGravitationalPotentialEnergy
Action: create
Status: implemented

[calculateGravitationalPotentialEnergy.data.ts](../../data/skills/energy/formsOfEnergy/skills/calculateGravitationalPotentialEnergy.data.ts)

Methodological description: Determine the change in a body's gravitational potential energy near Earth's surface from its mass, gravitational acceleration, and change in height, correctly accounting for the chosen reference level and units. This calculation assumes an approximately uniform gravitational field and differs from calculating elastic potential energy.
User-friendly description: Calculate changes in gravitational potential energy from mass, gravity and height.

#### Energy Transfer and Transformation

Slug: energyTransferAndTransformation
Action: create
Status: implemented

Skills: 2

[energyTransferAndTransformation.data.ts](../../data/skills/energy/energyTransferAndTransformation/energyTransferAndTransformation.data.ts)

Methodological description: Energy can pass between objects and change form; the sequence of events matters more than the name of a particular device.
User-friendly description: Discover how energy moves between bodies and changes form.

##### Identify energy transfer between bodies

Slug: identifyEnergyTransferBetweenBodies
Action: create
Status: implemented

[identifyEnergyTransferBetweenBodies.data.ts](../../data/skills/energy/energyTransferAndTransformation/skills/identifyEnergyTransferBetweenBodies.data.ts)

Methodological description: Using colliding balls or water heating, show which body transfers energy to which other body.
User-friendly description: Identify which body gives energy to another during an interaction.

##### Explain energy transformation in a physical process

Slug: explainEnergyTransformationInAPhysicalProcess
Action: create
Status: implemented

[explainEnergyTransformationInAPhysicalProcess.data.ts](../../data/skills/energy/energyTransferAndTransformation/skills/explainEnergyTransformationInAPhysicalProcess.data.ts)

Methodological description: Energy changes form during physical processes, for example when energy shifts between motion and position; the total energy of an isolated system is conserved.
User-friendly description: Trace an energy transformation while accounting for conservation.

#### Conservation of Energy

Slug: conservationOfEnergy
Action: create
Status: implemented

Skills: 3

[conservationOfEnergy.data.ts](../../data/skills/energy/conservationOfEnergy/conservationOfEnergy.data.ts)

Methodological description: The total energy of an isolated system is conserved even as its form or distribution among bodies changes. A decrease in energy available for useful work is not its disappearance; for an open system, exchange with the surroundings must be considered.
User-friendly description: Understand why the total energy of an isolated system is conserved.

##### Explain the law of conservation of energy

Slug: explainTheLawOfConservationOfEnergy
Action: create
Status: implemented

[explainTheLawOfConservationOfEnergy.data.ts](../../data/skills/energy/conservationOfEnergy/skills/explainTheLawOfConservationOfEnergy.data.ts)

Methodological description: The total energy of an isolated system remains unchanged; for an open system, energy exchange with the surroundings must be taken into account.
User-friendly description: Explain how energy remains conserved even when forms or locations change.

##### Explain the loss of useful energy

Slug: explainTheLossOfUsefulEnergy
Action: create
Status: implemented

[explainTheLossOfUsefulEnergy.data.ts](../../data/skills/energy/conservationOfEnergy/skills/explainTheLossOfUsefulEnergy.data.ts)

Methodological description: Dissipation into forms of energy less suitable for a particular task reduces a process's usefulness but does not violate conservation of total energy.
User-friendly description: Recognize why energy spread into less useful forms has not disappeared.

##### Refute the idea that energy disappears

Slug: refuteTheIdeaThatEnergyDisappears
Action: create
Status: implemented

[refuteTheIdeaThatEnergyDisappears.data.ts](../../data/skills/energy/conservationOfEnergy/skills/refuteTheIdeaThatEnergyDisappears.data.ts)

Methodological description: Identify unaccounted energy transfers and transformations instead of attributing a system's change of state to energy disappearing.
User-friendly description: Find where energy goes instead of assuming it simply vanishes.

#### Work and Power

Slug: workAndPower
Action: create
Status: implemented

Skills: 2

[workAndPower.data.ts](../../data/skills/energy/workAndPower/workAndPower.data.ts)

Methodological description: Work describes energy transfer by a force during displacement, while power describes the rate of energy transfer.
User-friendly description: Explore the physical meaning of mechanical work and power.

##### Explain mechanical work

Slug: explainMechanicalWork
Action: create
Status: implemented

[explainMechanicalWork.data.ts](../../data/skills/energy/workAndPower/skills/explainMechanicalWork.data.ts)

Methodological description: Mechanical work involves the component of force along displacement; exerting force without displacement does not perform mechanical work.
User-friendly description: Explain why a force transfers energy through displacement.

##### Explain the physical meaning of power

Slug: explainThePhysicalMeaningOfPower
Action: create
Status: implemented

[explainThePhysicalMeaningOfPower.data.ts](../../data/skills/energy/workAndPower/skills/explainThePhysicalMeaningOfPower.data.ts)

Methodological description: Power describes the rate of doing work or transferring energy and is not a separate form of energy.
User-friendly description: Understand power as the rate at which energy is transferred or work is done.

### Waves

Slug: waves
Action: create
Status: implemented

Groups: 4 · Skills: 23

[waves.data.ts](../../data/skills/waves/waves.data.ts)

Methodological description: Oscillations produce recurring disturbances that can propagate through water, air, and other media. Sound is one manifestation, while wave patterns are visible on the surface of water.
User-friendly description: Explore vibrations, sound and the ways wave disturbances travel and interact.

#### Oscillations

Slug: oscillations
Action: create
Status: implemented

Skills: 4

[oscillations.data.ts](../../data/skills/waves/oscillations/oscillations.data.ts)

Methodological description: Repetitive motion around a given state allows vibration, periodicity, and sound sources to be described.
User-friendly description: Learn how repeating motion creates oscillations and sound sources.

##### Recognize oscillatory motion

Slug: recognizeOscillatoryMotion
Action: create
Status: implemented

[recognizeOscillatoryMotion.data.ts](../../data/skills/waves/oscillations/skills/recognizeOscillatoryMotion.data.ts)

Methodological description: Oscillation is a change in a physical state around equilibrium that may recur; not every motion involving reversals is harmonic oscillation.
User-friendly description: Recognize when a physical state oscillates around equilibrium.

##### Relate sound to vibration

Slug: relateSoundToVibration
Action: create
Status: implemented

[relateSoundToVibration.data.ts](../../data/skills/waves/oscillations/skills/relateSoundToVibration.data.ts)

Methodological description: Sound arises when an oscillating source disturbs an elastic medium; oscillation without a medium does not produce a mechanical sound wave.
User-friendly description: Connect a vibrating source with the sound disturbance it produces.

##### Detect vibrations of a sound source

Slug: detectVibrationsOfASoundSource
Action: create
Status: implemented

[detectVibrationsOfASoundSource.data.ts](../../data/skills/waves/oscillations/skills/detectVibrationsOfASoundSource.data.ts)

Methodological description: Identify the oscillating part of a system that generates a sound disturbance, as distinct from components that merely transmit vibration onward.
User-friendly description: Identify the part of an object that actually vibrates to create sound.

##### Recognize the periodicity of oscillations

Slug: recognizeThePeriodicityOfOscillations
Action: create
Status: implemented

[recognizeThePeriodicityOfOscillations.data.ts](../../data/skills/waves/oscillations/skills/recognizeThePeriodicityOfOscillations.data.ts)

Methodological description: A periodic oscillation repeats a physical state at equal time intervals; not every motion that changes direction is periodic.
User-friendly description: Recognize an oscillation that repeats at regular intervals.

#### Wave Properties

Slug: waveProperties
Action: create
Status: implemented

Skills: 6

[waveProperties.data.ts](../../data/skills/waves/waveProperties/waveProperties.data.ts)

Methodological description: Waves have a direction of propagation, a characteristic rhythm, and a disturbance magnitude; observing water waves distinguishes wave propagation from transport of all the water.
User-friendly description: Discover how waves propagate and how their properties are measured.

##### Distinguish source oscillation from wave propagation

Slug: distinguishSourceOscillationFromWavePropagation
Action: create
Status: implemented

[distinguishSourceOscillationFromWavePropagation.data.ts](../../data/skills/waves/waveProperties/skills/distinguishSourceOscillationFromWavePropagation.data.ts)

Methodological description: An oscillating source creates a disturbance that propagates through a medium, while the medium's particles do not necessarily move along with the wavefront.
User-friendly description: Distinguish a vibrating source from the disturbance traveling away from it.

##### Compare wave frequencies by observable rhythm

Slug: compareWaveFrequenciesByObservableRhythm
Action: create
Status: implemented

[compareWaveFrequenciesByObservableRhythm.data.ts](../../data/skills/waves/waveProperties/skills/compareWaveFrequenciesByObservableRhythm.data.ts)

Methodological description: In two animations, identify which produces more recurring crests in the same amount of time.
User-friendly description: Compare waves by how many cycles occur during the same time.

##### Explain wave amplitude

Slug: explainWaveAmplitude
Action: create
Status: implemented

[explainWaveAmplitude.data.ts](../../data/skills/waves/waveProperties/skills/explainWaveAmplitude.data.ts)

Methodological description: Amplitude is the greatest deviation of a physical quantity from its equilibrium value, not the wave's frequency.
User-friendly description: Understand amplitude as the largest deviation from an equilibrium state.

##### Explain wavelength

Slug: explainWavelength
Action: create
Status: implemented

[explainWavelength.data.ts](../../data/skills/waves/waveProperties/skills/explainWavelength.data.ts)

Methodological description: Wavelength is the distance between adjacent points at the same phase of the disturbance, such as two successive crests.
User-friendly description: Identify wavelength as the spacing between matching points in a wave.

##### Explain wave speed

Slug: explainWaveSpeed
Action: create
Status: implemented

[explainWaveSpeed.data.ts](../../data/skills/waves/waveProperties/skills/explainWaveSpeed.data.ts)

Methodological description: Wave speed describes the propagation of a disturbance and differs from the motion of particles within the medium.
User-friendly description: Distinguish the speed of a wave from the motion of material particles.

##### Distinguish wave energy transfer from matter transport

Slug: distinguishWaveEnergyTransferFromMatterTransport
Action: create
Status: implemented

[distinguishWaveEnergyTransferFromMatterTransport.data.ts](../../data/skills/waves/waveProperties/skills/distinguishWaveEnergyTransferFromMatterTransport.data.ts)

Methodological description: A wave carries energy without necessarily transporting the entire medium over the corresponding distance.
User-friendly description: Explain how waves transfer energy without transporting an entire medium.

#### Acoustics

Slug: acoustics
Action: create
Status: implemented

Skills: 8

[acoustics.data.ts](../../data/skills/waves/acoustics/acoustics.data.ts)

Methodological description: Loudness, pitch, and the propagation of sound through a medium are related to oscillation properties; auditory experiences can be explored with safe simulations.
User-friendly description: Explore how vibration and sound propagation affect what we hear.

##### Compare the loudness of sounds

Slug: compareTheLoudnessOfSounds
Action: create
Status: implemented

[compareTheLoudnessOfSounds.data.ts](../../data/skills/waves/acoustics/skills/compareTheLoudnessOfSounds.data.ts)

Methodological description: Loudness is the perception of sound intensity and also depends on frequency and hearing sensitivity; compare it independently of pitch.
User-friendly description: Compare how loud sounds seem without confusing volume with pitch.

##### Distinguish high-pitched from low-pitched sounds

Slug: distinguishHighPitchedFromLowPitchedSounds
Action: create
Status: implemented

[distinguishHighPitchedFromLowPitchedSounds.data.ts](../../data/skills/waves/acoustics/skills/distinguishHighPitchedFromLowPitchedSounds.data.ts)

Methodological description: Pitch is primarily related to the frequency of sound oscillations, not amplitude, which affects intensity.
User-friendly description: Recognize high and low pitches by the frequency of sound waves.

##### Recognize sound transmission through a medium

Slug: recognizeSoundTransmissionThroughAMedium
Action: create
Status: implemented

[recognizeSoundTransmissionThroughAMedium.data.ts](../../data/skills/waves/acoustics/skills/recognizeSoundTransmissionThroughAMedium.data.ts)

Methodological description: Sound requires an elastic material medium, in which pressure or deformation oscillations pass between adjacent parts of matter; mechanical sound does not propagate in a vacuum.
User-friendly description: Explain why sound needs a medium through which vibrations can travel.

##### Explain sound attenuation with distance

Slug: explainSoundAttenuationWithDistance
Action: create
Status: implemented

[explainSoundAttenuationWithDistance.data.ts](../../data/skills/waves/acoustics/skills/explainSoundAttenuationWithDistance.data.ts)

Methodological description: As a wave spreads from a localized source, its energy is generally distributed over an increasing area, reducing intensity; absorption also affects sound levels.
User-friendly description: Understand why sounds from a source usually weaken with distance.

##### Explain an echo as sound reflection

Slug: explainAnEchoAsSoundReflection
Action: create
Status: implemented

[explainAnEchoAsSoundReflection.data.ts](../../data/skills/waves/acoustics/skills/explainAnEchoAsSoundReflection.data.ts)

Methodological description: Using an echo in an empty room, recognize a returning sound wave after it interacts with a surface.
User-friendly description: Explain an echo as a sound wave reflecting from a surface.

##### Explain the change in perceived pitch during relative motion of source and listener

Slug: explainTheChangeInPerceivedPitchDuringRelativeMotionOfSourceAndListener
Action: create
Status: implemented

[explainTheChangeInPerceivedPitchDuringRelativeMotionOfSourceAndListener.data.ts](../../data/skills/waves/acoustics/skills/explainTheChangeInPerceivedPitchDuringRelativeMotionOfSourceAndListener.data.ts)

Methodological description: For an unchanged sound emitted by a source, explain the Doppler effect: the frequency heard by the observer is higher as the source approaches and lower as it moves away. Do not confuse this frequency change with loudness or engine revolutions.
User-friendly description: Explore why moving sound sources can change the pitch someone hears.

##### Explain how sound pitch depends on oscillation frequency

Slug: explainHowSoundPitchDependsOnOscillationFrequency
Action: create
Status: implemented

[explainHowSoundPitchDependsOnOscillationFrequency.data.ts](../../data/skills/waves/acoustics/skills/explainHowSoundPitchDependsOnOscillationFrequency.data.ts)

Methodological description: All else being equal, a higher sound frequency corresponds to a higher pitch; it is not the same as increased loudness.
User-friendly description: Connect higher sound frequency with higher perceived pitch.

##### Explain how sound loudness depends on oscillation amplitude

Slug: explainHowSoundLoudnessDependsOnOscillationAmplitude
Action: create
Status: implemented

[explainHowSoundLoudnessDependsOnOscillationAmplitude.data.ts](../../data/skills/waves/acoustics/skills/explainHowSoundLoudnessDependsOnOscillationAmplitude.data.ts)

Methodological description: All else being equal, a greater sound-pressure amplitude means greater intensity, although perceived loudness also depends on frequency.
User-friendly description: Connect greater sound amplitude with intensity while accounting for perception.

#### Wave Phenomena

Slug: wavePhenomena
Action: create
Status: implemented

Skills: 5

[wavePhenomena.data.ts](../../data/skills/waves/wavePhenomena/wavePhenomena.data.ts)

Methodological description: Reflection, refraction, interference, diffraction, and resonance can occur in different kinds of physical waves.
User-friendly description: Discover how waves reflect, bend, overlap, spread and resonate.

##### Explain wave reflection

Slug: explainWaveReflection
Action: create
Status: implemented

[explainWaveReflection.data.ts](../../data/skills/waves/wavePhenomena/skills/explainWaveReflection.data.ts)

Methodological description: Part of a disturbance may return from a boundary between media, changing its direction of propagation.
User-friendly description: Explain how a wave can turn back when it reaches a boundary.

##### Explain wave refraction

Slug: explainWaveRefraction
Action: create
Status: implemented

[explainWaveRefraction.data.ts](../../data/skills/waves/wavePhenomena/skills/explainWaveRefraction.data.ts)

Methodological description: A change in propagation speed at a boundary between media can change a wave's direction while the source frequency stays the same.
User-friendly description: Understand why wave direction may change when propagation speed changes.

##### Explain wave interference

Slug: explainWaveInterference
Action: create
Status: implemented

[explainWaveInterference.data.ts](../../data/skills/waves/wavePhenomena/skills/explainWaveInterference.data.ts)

Methodological description: Superposed waves may reinforce or weaken the resulting disturbance depending on their phases.
User-friendly description: Recognize when overlapping waves reinforce or cancel one another.

##### Explain wave diffraction

Slug: explainWaveDiffraction
Action: create
Status: implemented

[explainWaveDiffraction.data.ts](../../data/skills/waves/wavePhenomena/skills/explainWaveDiffraction.data.ts)

Methodological description: Waves may bend around obstacles or spread after passing through openings depending on relative dimensions and wavelength.
User-friendly description: Explore how waves spread around obstacles or through openings.

##### Explain resonance

Slug: explainResonance
Action: create
Status: implemented

[explainResonance.data.ts](../../data/skills/waves/wavePhenomena/skills/explainResonance.data.ts)

Methodological description: A periodic driving force near a system's natural frequency can substantially increase the amplitude of its oscillations.
User-friendly description: Understand how repeated driving near a natural frequency can amplify oscillations.

### Thermodynamics

Slug: thermodynamics
Action: create
Status: implemented

Groups: 4 · Skills: 15

[thermodynamics.data.ts](../../data/skills/thermodynamics/thermodynamics.data.ts)

Methodological description: Thermal processes describe changes in temperature, energy transfer, and transitions between states of matter. Macroscopic observations are distinguished from particle-level explanations in the neighboring Domain.
User-friendly description: Explore temperature, heating, energy transfer and changes of state.

#### Temperature and Heating

Slug: temperatureAndHeating
Action: create
Status: implemented

Skills: 4

[temperatureAndHeating.data.ts](../../data/skills/thermodynamics/temperatureAndHeating/temperatureAndHeating.data.ts)

Methodological description: Temperature characterizes thermal state but is not the same as a subjective feeling of warmth or cold; heating and cooling are changes of state.
User-friendly description: Learn to distinguish temperature measurements from feelings of warmth.

##### Compare objects' temperatures

Slug: compareObjectsTemperatures
Action: create
Status: implemented

[compareObjectsTemperatures.data.ts](../../data/skills/thermodynamics/temperatureAndHeating/skills/compareObjectsTemperatures.data.ts)

Methodological description: Temperature characterizes a body's thermal state; valid comparisons rely on measurements, not the intensity of subjective warmth.
User-friendly description: Compare temperatures using instruments rather than touch alone.

##### Distinguish temperature from the sensation of warmth

Slug: distinguishTemperatureFromTheSensationOfWarmth
Action: create
Status: implemented

[distinguishTemperatureFromTheSensationOfWarmth.data.ts](../../data/skills/thermodynamics/temperatureAndHeating/skills/distinguishTemperatureFromTheSensationOfWarmth.data.ts)

Methodological description: Explain why the sensation of touch is not always an accurate measure of temperature.
User-friendly description: Explain why two objects at the same temperature can feel different.

##### Recognize heating

Slug: recognizeHeating
Action: create
Status: implemented

[recognizeHeating.data.ts](../../data/skills/thermodynamics/temperatureAndHeating/skills/recognizeHeating.data.ts)

Methodological description: An increase in temperature reflects a change in thermal state, but energy input does not always increase temperature during a phase transition.
User-friendly description: Recognize changes in thermal state during heating.

##### Recognize cooling

Slug: recognizeCooling
Action: create
Status: implemented

[recognizeCooling.data.ts](../../data/skills/thermodynamics/temperatureAndHeating/skills/recognizeCooling.data.ts)

Methodological description: A decrease in temperature can accompany energy transfer to the surroundings or changes in a system's physical state.
User-friendly description: Recognize cooling as a physical change in thermal state.

#### Heat-Transfer Mechanisms

Slug: heatTransferMechanisms
Action: create
Status: implemented

Skills: 5

[heatTransferMechanisms.data.ts](../../data/skills/thermodynamics/heatTransferMechanisms/heatTransferMechanisms.data.ts)

Methodological description: Thermal energy is transferred through particle interactions, liquid or gas motion, or electromagnetic radiation. Several mechanisms may act simultaneously in a single process.
User-friendly description: Discover how heat transfers through matter, flowing fluids and radiation.

##### Predict the direction of heat transfer

Slug: predictTheDirectionOfHeatTransfer
Action: create
Status: implemented

[predictTheDirectionOfHeatTransfer.data.ts](../../data/skills/thermodynamics/heatTransferMechanisms/skills/predictTheDirectionOfHeatTransfer.data.ts)

Methodological description: In the absence of external work, heat spontaneously flows from a warmer body to a colder one until thermal equilibrium is reached.
User-friendly description: Predict which way thermal energy flows between objects at different temperatures.

##### Explain conduction as energy transfer through matter

Slug: explainConductionAsEnergyTransferThroughMatter
Action: create
Status: implemented

[explainConductionAsEnergyTransferThroughMatter.data.ts](../../data/skills/thermodynamics/heatTransferMechanisms/skills/explainConductionAsEnergyTransferThroughMatter.data.ts)

Methodological description: Using a metal spoon heated in hot water, explain energy transfer without bulk movement of the entire substance.
User-friendly description: Explain heat conduction without requiring the substance to flow.

##### Explain convection as energy transfer by fluid flow

Slug: explainConvectionAsEnergyTransferByFluidFlow
Action: create
Status: implemented

[explainConvectionAsEnergyTransferByFluidFlow.data.ts](../../data/skills/thermodynamics/heatTransferMechanisms/skills/explainConvectionAsEnergyTransferByFluidFlow.data.ts)

Methodological description: Convection carries thermal energy with macroscopic motion of a liquid or gas; distinguish it from conduction without bulk material flow.
User-friendly description: Recognize how moving liquids and gases carry thermal energy.

##### Explain radiative heat transfer

Slug: explainRadiativeHeatTransfer
Action: create
Status: implemented

[explainRadiativeHeatTransfer.data.ts](../../data/skills/thermodynamics/heatTransferMechanisms/skills/explainRadiativeHeatTransfer.data.ts)

Methodological description: Using heat from the Sun or fire, demonstrate energy transfer by electromagnetic waves without contact or moving air.
User-friendly description: Explain how electromagnetic radiation transfers heat without a material medium.

##### Identify the heat-transfer mechanism from a physical situation

Slug: identifyTheHeatTransferMechanismFromAPhysicalSituation
Action: create
Status: implemented

[identifyTheHeatTransferMechanismFromAPhysicalSituation.data.ts](../../data/skills/thermodynamics/heatTransferMechanisms/skills/identifyTheHeatTransferMechanismFromAPhysicalSituation.data.ts)

Methodological description: For a hot spoon, heated water, or sunlight, select and justify conduction, convection, radiation, or a combination of them. This is an integrative competency, not three separate tests combined in one task.
User-friendly description: Identify which heat-transfer processes operate in a given situation.

#### Thermal Insulation

Slug: thermalInsulation
Action: create
Status: implemented

Skills: 2

[thermalInsulation.data.ts](../../data/skills/thermodynamics/thermalInsulation/thermalInsulation.data.ts)

Methodological description: Insulating materials slow down energy transfer but do not create energy themselves; this differs from describing the three mechanisms of heat exchange.
User-friendly description: Explore how insulation slows the transfer of heat.

##### Compare materials' thermal-insulation properties

Slug: compareMaterialsThermalInsulationProperties
Action: create
Status: implemented

[compareMaterialsThermalInsulationProperties.data.ts](../../data/skills/thermodynamics/thermalInsulation/skills/compareMaterialsThermalInsulationProperties.data.ts)

Methodological description: Determine from experimental results which material slows heat transfer more effectively.
User-friendly description: Compare materials by how well they reduce unwanted heat transfer.

##### Select a material for maintaining temperature

Slug: selectAMaterialForMaintainingTemperature
Action: create
Status: implemented

[selectAMaterialForMaintainingTemperature.data.ts](../../data/skills/thermodynamics/thermalInsulation/skills/selectAMaterialForMaintainingTemperature.data.ts)

Methodological description: Choose an insulator for a simple everyday task and justify the choice using the material's properties.
User-friendly description: Choose an insulating material for a practical temperature-control need.

#### Phase Transitions

Slug: phaseTransitions
Action: create
Status: implemented

Skills: 4

[phaseTransitions.data.ts](../../data/skills/thermodynamics/phaseTransitions/phaseTransitions.data.ts)

Methodological description: Melting, freezing, evaporation, and condensation link thermal conditions to changes of state of the same substance.
User-friendly description: Discover how heating and cooling can change matter's physical state.

##### Distinguish melting from freezing of water

Slug: distinguishMeltingFromFreezingOfWater
Action: create
Status: implemented

[distinguishMeltingFromFreezingOfWater.data.ts](../../data/skills/thermodynamics/phaseTransitions/skills/distinguishMeltingFromFreezingOfWater.data.ts)

Methodological description: Melting changes a substance from solid to liquid, while freezing is the reverse; both are phase transitions of the same substance.
User-friendly description: Distinguish ice melting from liquid water freezing.

##### Explain evaporation

Slug: explainEvaporation
Action: create
Status: implemented

[explainEvaporation.data.ts](../../data/skills/thermodynamics/phaseTransitions/skills/explainEvaporation.data.ts)

Methodological description: Evaporation is the transition of particles from the surface of a liquid into the gas phase and can occur without boiling.
User-friendly description: Explain evaporation from a liquid's surface without boiling.

##### Explain condensation

Slug: explainCondensation
Action: create
Status: implemented

[explainCondensation.data.ts](../../data/skills/thermodynamics/phaseTransitions/skills/explainCondensation.data.ts)

Methodological description: Condensation is the transition of matter from gas to liquid, including the formation of droplets from water vapor.
User-friendly description: Recognize gas turning into liquid through condensation.

##### Distinguish evaporation from boiling

Slug: distinguishEvaporationFromBoiling
Action: create
Status: implemented

[distinguishEvaporationFromBoiling.data.ts](../../data/skills/thermodynamics/phaseTransitions/skills/distinguishEvaporationFromBoiling.data.ts)

Methodological description: Boiling produces vapor bubbles throughout the volume of a liquid, whereas evaporation occurs at its surface.
User-friendly description: Distinguish bubbles formed during boiling from surface evaporation.

### Molecular Physics

Slug: molecularPhysics
Action: create
Status: implemented

Groups: 3 · Skills: 10

[molecularPhysics.data.ts](../../data/skills/molecularPhysics/molecularPhysics.data.ts)

Methodological description: Particle models help explain physical properties and changes in states of matter. Unlike chemistry, this Domain focuses on particle movement, interactions, and arrangement rather than chemical reactions.
User-friendly description: Explore how the movement and arrangement of particles explain matter's behavior.

#### Particle Model of Matter

Slug: particleModelOfMatter
Action: create
Status: implemented

Skills: 7

[particleModelOfMatter.data.ts](../../data/skills/molecularPhysics/particleModelOfMatter/particleModelOfMatter.data.ts)

Methodological description: Substances consist of particles with spaces and interactions between them; the model explains properties without requiring complex formulas.
User-friendly description: Learn how invisible particles interact to make up physical substances.

##### Explain the particulate structure of matter

Slug: explainTheParticulateStructureOfMatter
Action: create
Status: implemented

[explainTheParticulateStructureOfMatter.data.ts](../../data/skills/molecularPhysics/particleModelOfMatter/skills/explainTheParticulateStructureOfMatter.data.ts)

Methodological description: Demonstrate that even water in a transparent glass consists of particles invisible to the naked eye.
User-friendly description: Explain why ordinary matter is made of particles too small to see directly.

##### Compare particle arrangements in solids, liquids, and gases

Slug: compareParticleArrangementsInSolidsLiquidsAndGases
Action: create
Status: implemented

[compareParticleArrangementsInSolidsLiquidsAndGases.data.ts](../../data/skills/molecularPhysics/particleModelOfMatter/skills/compareParticleArrangementsInSolidsLiquidsAndGases.data.ts)

Methodological description: Particles in solids mostly oscillate around fixed positions; in liquids, particles can move relative to one another; and in gases they have much greater freedom of movement and characteristic interparticle distances.
User-friendly description: Compare particle arrangements in solids, liquids and gases.

##### Relate particle motion to temperature changes

Slug: relateParticleMotionToTemperatureChanges
Action: create
Status: implemented

[relateParticleMotionToTemperatureChanges.data.ts](../../data/skills/molecularPhysics/particleModelOfMatter/skills/relateParticleMotionToTemperatureChanges.data.ts)

Methodological description: Using an animation, explain why average particle motion generally becomes more vigorous when heated.
User-friendly description: Connect heating with changes in the typical motion of particles.

##### Explain random thermal motion of particles

Slug: explainRandomThermalMotionOfParticles
Action: create
Status: implemented

[explainRandomThermalMotionOfParticles.data.ts](../../data/skills/molecularPhysics/particleModelOfMatter/skills/explainRandomThermalMotionOfParticles.data.ts)

Methodological description: Particles of matter are constantly moving, but not all at the same speed; the type of motion depends on the physical state.
User-friendly description: Understand why particles continually move in different ways and speeds.

##### Explain gas pressure through particle motion

Slug: explainGasPressureThroughParticleMotion
Action: create
Status: implemented

[explainGasPressureThroughParticleMotion.data.ts](../../data/skills/molecularPhysics/particleModelOfMatter/skills/explainGasPressureThroughParticleMotion.data.ts)

Methodological description: The combined collisions of particles with the vessel walls produce force per unit area, that is, pressure.
User-friendly description: Explain gas pressure through many particle collisions with a surface.

##### Explain thermal expansion through particle motion and interactions

Slug: explainThermalExpansionThroughParticleMotionAndInteractions
Action: create
Status: implemented

[explainThermalExpansionThroughParticleMotionAndInteractions.data.ts](../../data/skills/molecularPhysics/particleModelOfMatter/skills/explainThermalExpansionThroughParticleMotionAndInteractions.data.ts)

Methodological description: Heating often changes the average distances between particles, not the sizes of the molecules themselves.
User-friendly description: Recognize why expansion usually changes particle spacing, not particle size.

##### Explain the properties of states of matter through particle motion

Slug: explainThePropertiesOfStatesOfMatterThroughParticleMotion
Action: create
Status: implemented

[explainThePropertiesOfStatesOfMatterThroughParticleMotion.data.ts](../../data/skills/molecularPhysics/particleModelOfMatter/skills/explainThePropertiesOfStatesOfMatterThroughParticleMotion.data.ts)

Methodological description: Differences in the arrangement, motion, and interactions of particles explain the properties of solids, liquids, and gases.
User-friendly description: Use particle motion and interactions to explain the properties of states of matter.

#### Diffusion and Mixing

Slug: diffusionAndMixing
Action: create
Status: implemented

Skills: 1

[diffusionAndMixing.data.ts](../../data/skills/molecularPhysics/diffusionAndMixing/diffusionAndMixing.data.ts)

Methodological description: Random thermal motion can cause particles to spread gradually without deliberate stirring.
User-friendly description: Discover how random particle movement causes substances to spread and mix.

##### Explain diffusion

Slug: explainDiffusion
Action: create
Status: implemented

[explainDiffusion.data.ts](../../data/skills/molecularPhysics/diffusionAndMixing/skills/explainDiffusion.data.ts)

Methodological description: Diffusion results from particles' thermal motion and the gradual equalization of their concentrations without the need for macroscopic mixing.
User-friendly description: Explain how diffusion can occur without stirring.

#### Gas Properties

Slug: gasProperties
Action: create
Status: implemented

Skills: 2

[gasProperties.data.ts](../../data/skills/molecularPhysics/gasProperties/gasProperties.data.ts)

Methodological description: The compressibility of gases and the dependence of their pressure on conditions follow from particle motion and the spaces between particles.
User-friendly description: Explore the physical properties of gases using the particle model.

##### Explain gas compressibility

Slug: explainGasCompressibility
Action: create
Status: implemented

[explainGasCompressibility.data.ts](../../data/skills/molecularPhysics/gasProperties/skills/explainGasCompressibility.data.ts)

Methodological description: Compressing a gas reduces the average distances between particles while the sizes of the molecules remain virtually unchanged.
User-friendly description: Understand why gases can be squeezed into a smaller volume.

##### Explain how gas pressure depends on temperature at constant volume

Slug: explainHowGasPressureDependsOnTemperatureAtConstantVolume
Action: create
Status: implemented

[explainHowGasPressureDependsOnTemperatureAtConstantVolume.data.ts](../../data/skills/molecularPhysics/gasProperties/skills/explainHowGasPressureDependsOnTemperatureAtConstantVolume.data.ts)

Methodological description: At constant volume, increasing a gas's temperature generally increases its pressure because the particles move more vigorously.
User-friendly description: Explain why gas pressure increases with temperature when volume stays fixed.

### Electromagnetism

Slug: electromagnetism
Action: create
Status: implemented

Groups: 8 · Skills: 31

[electromagnetism.data.ts](../../data/skills/electromagnetism/electromagnetism.data.ts)

Methodological description: Electric charges, currents, and magnetic fields describe related interactions; electricity and magnetism share underlying principles but begin with different observations.
User-friendly description: Explore how charges, electric currents and magnetic fields interact.

#### Electric Charges and Interactions

Slug: electricChargesAndInteractions
Action: create
Status: implemented

Skills: 3

[electricChargesAndInteractions.data.ts](../../data/skills/electromagnetism/electricChargesAndInteractions/electricChargesAndInteractions.data.ts)

Methodological description: Electrification, interactions between charged bodies, and charge transfer obey conservation of electric charge. Electric interaction can occur without direct contact.
User-friendly description: Learn how electric charges are transferred and exert forces.

##### Recognize the charging of objects by friction

Slug: recognizeTheChargingOfObjectsByFriction
Action: create
Status: implemented

[recognizeTheChargingOfObjectsByFriction.data.ts](../../data/skills/electromagnetism/electricChargesAndInteractions/skills/recognizeTheChargingOfObjectsByFriction.data.ts)

Methodological description: Using a safe balloon or comb model, connect friction with electrostatic effects rather than attributing them to magnetic attraction.
User-friendly description: Recognize how rubbing some objects produces electrostatic effects.

##### Distinguish attraction from repulsion between electric charges

Slug: distinguishAttractionFromRepulsionBetweenElectricCharges
Action: create
Status: implemented

[distinguishAttractionFromRepulsionBetweenElectricCharges.data.ts](../../data/skills/electromagnetism/electricChargesAndInteractions/skills/distinguishAttractionFromRepulsionBetweenElectricCharges.data.ts)

Methodological description: Like charges repel and unlike charges attract; electric interaction is distinct from magnetic interaction.
User-friendly description: Distinguish attraction between opposite charges from repulsion between like charges.

##### Explain conservation of electric charge

Slug: explainConservationOfElectricCharge
Action: create
Status: implemented

[explainConservationOfElectricCharge.data.ts](../../data/skills/electromagnetism/electricChargesAndInteractions/skills/explainConservationOfElectricCharge.data.ts)

Methodological description: The total charge of an isolated system is conserved during charge transfer and physical interactions.
User-friendly description: Explain why total electric charge stays constant during transfers.

#### Electric Circuits

Slug: electricCircuits
Action: create
Status: implemented

Skills: 9

[electricCircuits.data.ts](../../data/skills/electromagnetism/electricCircuits/electricCircuits.data.ts)

Methodological description: An electric circuit needs a conducting path, a source, and components whose interactions determine the operation of a safe model.
User-friendly description: Discover how sources, switches and loads work together in simple circuits.

##### Identify an electrical power source

Slug: identifyAnElectricalPowerSource
Action: create
Status: implemented

[identifyAnElectricalPowerSource.data.ts](../../data/skills/electromagnetism/electricCircuits/skills/identifyAnElectricalPowerSource.data.ts)

Methodological description: A source maintains a potential difference between its terminals and converts other forms of energy into electrical energy, unlike a passive conductor.
User-friendly description: Identify the component that maintains a potential difference in a circuit.

##### Identify a consumer of electrical energy

Slug: identifyAConsumerOfElectricalEnergy
Action: create
Status: implemented

[identifyAConsumerOfElectricalEnergy.data.ts](../../data/skills/electromagnetism/electricCircuits/skills/identifyAConsumerOfElectricalEnergy.data.ts)

Methodological description: An electrical load converts received electrical energy into thermal, mechanical, light, or other forms, rather than merely "using current."
User-friendly description: Recognize loads that transform electrical energy into other forms.

##### Identify the function of a switch

Slug: identifyTheFunctionOfASwitch
Action: create
Status: implemented

[identifyTheFunctionOfASwitch.data.ts](../../data/skills/electromagnetism/electricCircuits/skills/identifyTheFunctionOfASwitch.data.ts)

Methodological description: A switch changes the state of a conducting path and can interrupt current in a particular branch, but it is not itself an energy source.
User-friendly description: Explain how a switch changes whether a current path is connected.

##### Recognize a closed electric circuit

Slug: recognizeAClosedElectricCircuit
Action: create
Status: implemented

[recognizeAClosedElectricCircuit.data.ts](../../data/skills/electromagnetism/electricCircuits/skills/recognizeAClosedElectricCircuit.data.ts)

Methodological description: A closed circuit has a continuous conducting path; sustained current also requires a source of electromotive force.
User-friendly description: Recognize when a circuit has a continuous conducting path.

##### Explain an open circuit

Slug: explainAnOpenCircuit
Action: create
Status: implemented

[explainAnOpenCircuit.data.ts](../../data/skills/electromagnetism/electricCircuits/skills/explainAnOpenCircuit.data.ts)

Methodological description: Opening a branch interrupts its conducting path; in a circuit with parallel branches, other parts may continue to operate.
User-friendly description: Explain what happens when a current path is broken.

##### Predict the effect of a switch in a circuit

Slug: predictTheEffectOfASwitchInACircuit
Action: create
Status: implemented

[predictTheEffectOfASwitchInACircuit.data.ts](../../data/skills/electromagnetism/electricCircuits/skills/predictTheEffectOfASwitchInACircuit.data.ts)

Methodological description: The consequences of switching depend on where the switch is placed relative to the source, loads, and parallel paths.
User-friendly description: Predict which circuit parts a switch will turn on or off.

##### Explain series connections of electric circuit components

Slug: explainSeriesConnectionsOfElectricCircuitComponents
Action: create
Status: implemented

[explainSeriesConnectionsOfElectricCircuitComponents.data.ts](../../data/skills/electromagnetism/electricCircuits/skills/explainSeriesConnectionsOfElectricCircuitComponents.data.ts)

Methodological description: Components connected in series share a common current path: the same current passes through each, and the total voltage across the combination is the sum of the voltages across the individual components. Breaking the single path stops current through all those components.
User-friendly description: Explore how components on one path share current in a series circuit.

##### Explain parallel connections of electric circuit components

Slug: explainParallelConnectionsOfElectricCircuitComponents
Action: create
Status: implemented

[explainParallelConnectionsOfElectricCircuitComponents.data.ts](../../data/skills/electromagnetism/electricCircuits/skills/explainParallelConnectionsOfElectricCircuitComponents.data.ts)

Methodological description: Parallel branches connect to the same two nodes, so each has the same voltage and the total current is divided among the branches. Opening one branch does not necessarily stop current in the others.
User-friendly description: Understand how separate parallel branches share voltage and split current.

##### Explain current balance at a circuit node

Slug: explainCurrentBalanceAtACircuitNode
Action: create
Status: implemented

[explainCurrentBalanceAtACircuitNode.data.ts](../../data/skills/electromagnetism/electricCircuits/skills/explainCurrentBalanceAtACircuitNode.data.ts)

Methodological description: Under steady current, charge does not accumulate at a node; the total current entering equals the total current leaving.
User-friendly description: Explain why current entering a steady circuit junction equals current leaving.

#### Conductors and Insulators

Slug: conductorsAndInsulators
Action: create
Status: implemented

Skills: 2

[conductorsAndInsulators.data.ts](../../data/skills/electromagnetism/conductorsAndInsulators/conductorsAndInsulators.data.ts)

Methodological description: Materials differ in how readily they permit electric charge to move; distinguish an electrical property of a material from a device's purpose.
User-friendly description: Explore why some materials let charges move more easily than others.

##### Identify electrically conductive materials

Slug: identifyElectricallyConductiveMaterials
Action: create
Status: implemented

[identifyElectricallyConductiveMaterials.data.ts](../../data/skills/electromagnetism/conductorsAndInsulators/skills/identifyElectricallyConductiveMaterials.data.ts)

Methodological description: Determine experimentally which materials complete a low-voltage circuit.
User-friendly description: Test which materials conduct electricity using a safe low-voltage circuit.

##### Identify electrically insulating materials

Slug: identifyElectricallyInsulatingMaterials
Action: create
Status: implemented

[identifyElectricallyInsulatingMaterials.data.ts](../../data/skills/electromagnetism/conductorsAndInsulators/skills/identifyElectricallyInsulatingMaterials.data.ts)

Methodological description: Determine experimentally which materials impede the flow of current.
User-friendly description: Identify materials that prevent or greatly limit electric current.

#### Magnetic Properties and Interactions

Slug: magneticPropertiesAndInteractions
Action: create
Status: implemented

Skills: 6

[magneticPropertiesAndInteractions.data.ts](../../data/skills/electromagnetism/magneticPropertiesAndInteractions/magneticPropertiesAndInteractions.data.ts)

Methodological description: Materials and pole orientation affect interactions; direct contact between magnets is not required.
User-friendly description: Discover how magnetic materials and poles interact.

##### Identify materials attracted to a magnet

Slug: identifyMaterialsAttractedToAMagnet
Action: create
Status: implemented

[identifyMaterialsAttractedToAMagnet.data.ts](../../data/skills/electromagnetism/magneticPropertiesAndInteractions/skills/identifyMaterialsAttractedToAMagnet.data.ts)

Methodological description: The observable effect of a magnetic field on a material depends on its magnetic properties; not all metals are attracted equally.
User-friendly description: Recognize materials that respond strongly to magnetic fields.

##### Classify objects by magnetic interaction

Slug: classifyObjectsByMagneticInteraction
Action: create
Status: implemented

[classifyObjectsByMagneticInteraction.data.ts](../../data/skills/electromagnetism/magneticPropertiesAndInteractions/skills/classifyObjectsByMagneticInteraction.data.ts)

Methodological description: Classification is based on the direction and magnitude of a material's magnetic response under relevant conditions; this is not the same as determining whether it has its own magnetic field.
User-friendly description: Classify objects by the magnetic response they exhibit.

##### Recognize magnetic attraction

Slug: recognizeMagneticAttraction
Action: create
Status: implemented

[recognizeMagneticAttraction.data.ts](../../data/skills/electromagnetism/magneticPropertiesAndInteractions/skills/recognizeMagneticAttraction.data.ts)

Methodological description: Identify a situation in which magnets move toward one another due to their interaction.
User-friendly description: Recognize situations in which magnets attract each other.

##### Recognize magnetic repulsion

Slug: recognizeMagneticRepulsion
Action: create
Status: implemented

[recognizeMagneticRepulsion.data.ts](../../data/skills/electromagnetism/magneticPropertiesAndInteractions/skills/recognizeMagneticRepulsion.data.ts)

Methodological description: Identify a situation in which magnets move apart due to their interaction.
User-friendly description: Recognize situations in which magnets repel each other.

##### Predict interactions between magnetic poles

Slug: predictInteractionsBetweenMagneticPoles
Action: create
Status: implemented

[predictInteractionsBetweenMagneticPoles.data.ts](../../data/skills/electromagnetism/magneticPropertiesAndInteractions/skills/predictInteractionsBetweenMagneticPoles.data.ts)

Methodological description: Determine attraction or repulsion from a known arrangement of poles.
User-friendly description: Predict what happens when known magnetic poles approach one another.

##### Explain magnetic action without contact

Slug: explainMagneticActionWithoutContact
Action: create
Status: implemented

[explainMagneticActionWithoutContact.data.ts](../../data/skills/electromagnetism/magneticPropertiesAndInteractions/skills/explainMagneticActionWithoutContact.data.ts)

Methodological description: Recognize magnetic force as an interaction that does not require direct contact.
User-friendly description: Explain why a magnet can exert force without touching an object.

#### Electromagnets and Induction

Slug: electromagnetsAndInduction
Action: create
Status: implemented

Skills: 2

[electromagnetsAndInduction.data.ts](../../data/skills/electromagnetism/electromagnetsAndInduction/electromagnetsAndInduction.data.ts)

Methodological description: Electric current can create a magnetic field, and changing magnetic conditions can produce electrical effects, explaining many systems.
User-friendly description: Discover how currents create magnetic fields and changing fields induce electricity.

##### Explain the magnetic effect of electric current

Slug: explainTheMagneticEffectOfElectricCurrent
Action: create
Status: implemented

[explainTheMagneticEffectOfElectricCurrent.data.ts](../../data/skills/electromagnetism/electromagnetsAndInduction/skills/explainTheMagneticEffectOfElectricCurrent.data.ts)

Methodological description: Moving electric charges create a magnetic field; changing the current changes the field it produces and the associated magnetic interactions.
User-friendly description: Explain why an electric current produces a magnetic field.

##### Explain how induced current arises

Slug: explainHowInducedCurrentArises
Action: create
Status: implemented

[explainHowInducedCurrentArises.data.ts](../../data/skills/electromagnetism/electromagnetsAndInduction/skills/explainHowInducedCurrentArises.data.ts)

Methodological description: A changing magnetic flux through a closed conducting loop can induce an electromotive force and current; constant flux by itself does not generate current.
User-friendly description: Recognize when changing magnetic flux produces an induced current.

#### Magnetic Effects in Physical Systems

Slug: magneticEffectsInPhysicalSystems
Action: create
Status: implemented

Skills: 1

[magneticEffectsInPhysicalSystems.data.ts](../../data/skills/electromagnetism/magneticEffectsInPhysicalSystems/magneticEffectsInPhysicalSystems.data.ts)

Methodological description: Magnetic forces in real systems are explained by fields and material properties; choosing an engineering design belongs to Engineering.
User-friendly description: Explore the effects of magnetic fields on physical systems.

##### Explain the physical role of a magnetic field in a system

Slug: explainThePhysicalRoleOfAMagneticFieldInASystem
Action: create
Status: implemented

[explainThePhysicalRoleOfAMagneticFieldInASystem.data.ts](../../data/skills/electromagnetism/magneticEffectsInPhysicalSystems/skills/explainThePhysicalRoleOfAMagneticFieldInASystem.data.ts)

Methodological description: Determine how magnetic interaction affects a system's motion or state without proceeding to select a technical component.
User-friendly description: Explain how a magnetic field influences motion or another physical state.

#### Electric and Magnetic Fields

Slug: electricAndMagneticFields
Action: create
Status: implemented

Skills: 3

[electricAndMagneticFields.data.ts](../../data/skills/electromagnetism/electricAndMagneticFields/electricAndMagneticFields.data.ts)

Methodological description: Fields describe interactions involving electric charges and magnetic systems without direct contact, but their physical effects differ.
User-friendly description: Learn how electric and magnetic fields exert different kinds of forces.

##### Explain the electric field

Slug: explainTheElectricField
Action: create
Status: implemented

[explainTheElectricField.data.ts](../../data/skills/electromagnetism/electricAndMagneticFields/skills/explainTheElectricField.data.ts)

Methodological description: An electric field determines the force on an electric charge and exists independently of a test charge.
User-friendly description: Understand how an electric field affects a charge even without direct contact.

##### Explain the magnetic field

Slug: explainTheMagneticField
Action: create
Status: implemented

[explainTheMagneticField.data.ts](../../data/skills/electromagnetism/electricAndMagneticFields/skills/explainTheMagneticField.data.ts)

Methodological description: A magnetic field can act on moving charges and magnetic systems; the direction and magnitude of its effects depend on conditions.
User-friendly description: Explain how magnetic fields affect moving charges and magnetic objects.

##### Distinguish electric from magnetic fields

Slug: distinguishElectricFromMagneticFields
Action: create
Status: implemented

[distinguishElectricFromMagneticFields.data.ts](../../data/skills/electromagnetism/electricAndMagneticFields/skills/distinguishElectricFromMagneticFields.data.ts)

Methodological description: An electric field can act on a stationary charge, whereas the magnetic component of the force on a charge depends on its motion.
User-friendly description: Distinguish forces on stationary charges from magnetic forces on moving charges.

#### Current, Voltage, and Resistance

Slug: currentVoltageAndResistance
Action: create
Status: implemented

Skills: 5

[currentVoltageAndResistance.data.ts](../../data/skills/electromagnetism/currentVoltageAndResistance/currentVoltageAndResistance.data.ts)

Methodological description: Current describes the flow of electric charge, voltage is a potential difference, and resistance is opposition to current under specified physical conditions.
User-friendly description: Discover how current, voltage, resistance and power describe circuits.

##### Explain electric current

Slug: explainElectricCurrent
Action: create
Status: implemented

[explainElectricCurrent.data.ts](../../data/skills/electromagnetism/currentVoltageAndResistance/skills/explainElectricCurrent.data.ts)

Methodological description: Electric current involves directed transport of charge, not merely random motion of charge carriers.
User-friendly description: Understand electric current as the directed movement of charge.

##### Explain electric voltage

Slug: explainElectricVoltage
Action: create
Status: implemented

[explainElectricVoltage.data.ts](../../data/skills/electromagnetism/currentVoltageAndResistance/skills/explainElectricVoltage.data.ts)

Methodological description: Voltage specifies the difference in electric potential between two points and is not current itself.
User-friendly description: Explain voltage as an electric potential difference between two points.

##### Explain electrical resistance

Slug: explainElectricalResistance
Action: create
Status: implemented

[explainElectricalResistance.data.ts](../../data/skills/electromagnetism/currentVoltageAndResistance/skills/explainElectricalResistance.data.ts)

Methodological description: Resistance determines the relationship between voltage and current under given conditions and depends on conductor material and geometry.
User-friendly description: Explore how resistance affects current under specified conditions.

##### Explain Ohm's law for an ohmic conductor

Slug: explainOhmsLawForAnOhmicConductor
Action: create
Status: implemented

[explainOhmsLawForAnOhmicConductor.data.ts](../../data/skills/electromagnetism/currentVoltageAndResistance/skills/explainOhmsLawForAnOhmicConductor.data.ts)

Methodological description: Under constant conditions, the current through an ohmic conductor is directly proportional to voltage; this law does not describe every component without exception.
User-friendly description: Use Ohm's law for conductors that behave ohmically under constant conditions.

##### Explain electrical power

Slug: explainElectricalPower
Action: create
Status: implemented

[explainElectricalPower.data.ts](../../data/skills/electromagnetism/currentVoltageAndResistance/skills/explainElectricalPower.data.ts)

Methodological description: Electrical power describes the rate of electrical energy transfer or transformation.
User-friendly description: Understand electrical power as the rate of energy transfer.

### Optics

Slug: optics
Action: create
Status: implemented

Groups: 5 · Skills: 11

[optics.data.ts](../../data/skills/optics/optics.data.ts)

Methodological description: Optics studies the propagation of light, image formation, and the interaction of light rays with surfaces, water, and lenses. The broader electromagnetic radiation spectrum is classified separately.
User-friendly description: Explore how visible light travels, reflects, refracts and forms images.

#### Light Sources and Visibility

Slug: lightSourcesAndVisibility
Action: create
Status: implemented

Skills: 3

[lightSourcesAndVisibility.data.ts](../../data/skills/optics/lightSourcesAndVisibility/lightSourcesAndVisibility.data.ts)

Methodological description: An object is visible when light from it reaches the eye; a light source and an illuminated surface play different roles.
User-friendly description: Discover why some objects emit light and others are visible by reflection.

##### Distinguish a light source from an illuminated body

Slug: distinguishALightSourceFromAnIlluminatedBody
Action: create
Status: implemented

[distinguishALightSourceFromAnIlluminatedBody.data.ts](../../data/skills/optics/lightSourcesAndVisibility/skills/distinguishALightSourceFromAnIlluminatedBody.data.ts)

Methodological description: Recognize a body that emits light and one that reflects it.
User-friendly description: Distinguish something that emits light from something it illuminates.

##### Classify natural and artificial light sources

Slug: classifyNaturalAndArtificialLightSources
Action: create
Status: implemented

[classifyNaturalAndArtificialLightSources.data.ts](../../data/skills/optics/lightSourcesAndVisibility/skills/classifyNaturalAndArtificialLightSources.data.ts)

Methodological description: Group light sources according to their origin.
User-friendly description: Recognize natural and human-made sources of light.

##### Explain the condition for an object to be visible

Slug: explainTheConditionForAnObjectToBeVisible
Action: create
Status: implemented

[explainTheConditionForAnObjectToBeVisible.data.ts](../../data/skills/optics/lightSourcesAndVisibility/skills/explainTheConditionForAnObjectToBeVisible.data.ts)

Methodological description: Identify the need for light from an object to reach the eye.
User-friendly description: Explain why we see an object only when light from it reaches the eye.

#### Light and Shadows

Slug: lightAndShadows
Action: create
Status: implemented

Skills: 3

[lightAndShadows.data.ts](../../data/skills/optics/lightAndShadows/lightAndShadows.data.ts)

Methodological description: Obstacles and the source's position determine a shadow's appearance, direction, and size; a model enables qualitative predictions.
User-friendly description: Explore how the arrangement of objects and light sources creates shadows.

##### Explain how a shadow forms

Slug: explainHowAShadowForms
Action: create
Status: implemented

[explainHowAShadowForms.data.ts](../../data/skills/optics/lightAndShadows/skills/explainHowAShadowForms.data.ts)

Methodological description: Relate a shadow to the blocking of light by an opaque object.
User-friendly description: Explain how an opaque object blocks light to form a shadow.

##### Predict the position of a shadow

Slug: predictThePositionOfAShadow
Action: create
Status: implemented

[predictThePositionOfAShadow.data.ts](../../data/skills/optics/lightAndShadows/skills/predictThePositionOfAShadow.data.ts)

Methodological description: Predict where a shadow forms given the positions of the source and object.
User-friendly description: Predict which side of an object a shadow will appear on.

##### Predict changes in shadow size

Slug: predictChangesInShadowSize
Action: create
Status: implemented

[predictChangesInShadowSize.data.ts](../../data/skills/optics/lightAndShadows/skills/predictChangesInShadowSize.data.ts)

Methodological description: Determine how changing their relative positions affects shadow size.
User-friendly description: Understand how moving a light source or object changes shadow size.

#### Transparency

Slug: transparency
Action: create
Status: implemented

Skills: 1

[transparency.data.ts](../../data/skills/optics/transparency/transparency.data.ts)

Methodological description: Transparency characterizes the transmission, absorption, and scattering of visible light by a material and its ability to transmit an image.
User-friendly description: Learn how materials differ in the amount and clarity of light they transmit.

##### Classify materials by transparency

Slug: classifyMaterialsByTransparency
Action: create
Status: implemented

[classifyMaterialsByTransparency.data.ts](../../data/skills/optics/transparency/skills/classifyMaterialsByTransparency.data.ts)

Methodological description: Distinguish transparent, translucent, and opaque materials by their ability to transmit light and form a clear image through the material.
User-friendly description: Distinguish transparent, translucent and opaque materials.

#### Light Reflection

Slug: lightReflection
Action: create
Status: implemented

Skills: 2

[lightReflection.data.ts](../../data/skills/optics/lightReflection/lightReflection.data.ts)

Methodological description: A surface changes the direction of a light ray; mirrors provide a visible model of this behavior.
User-friendly description: Discover how light changes direction when it meets a reflecting surface.

##### Recognize light reflection

Slug: recognizeLightReflection
Action: create
Status: implemented

[recognizeLightReflection.data.ts](../../data/skills/optics/lightReflection/skills/recognizeLightReflection.data.ts)

Methodological description: Identify situations in which light returns from a surface.
User-friendly description: Recognize when light bounces back from a surface.

##### Predict the direction of a reflected ray

Slug: predictTheDirectionOfAReflectedRay
Action: create
Status: implemented

[predictTheDirectionOfAReflectedRay.data.ts](../../data/skills/optics/lightReflection/skills/predictTheDirectionOfAReflectedRay.data.ts)

Methodological description: According to the law of reflection, the angle between the ray and the surface normal is the same for incident and reflected rays.
User-friendly description: Predict reflection angles relative to the normal of a surface.

#### Refraction and Lenses

Slug: refractionAndLenses
Action: create
Status: implemented

Skills: 2

[refractionAndLenses.data.ts](../../data/skills/optics/refractionAndLenses/refractionAndLenses.data.ts)

Methodological description: Moving between media and the shape of a lens affect ray direction and image formation.
User-friendly description: Explore how light bends between materials and through lenses.

##### Explain light refraction at the boundary between media

Slug: explainLightRefractionAtTheBoundaryBetweenMedia
Action: create
Status: implemented

[explainLightRefractionAtTheBoundaryBetweenMedia.data.ts](../../data/skills/optics/refractionAndLenses/skills/explainLightRefractionAtTheBoundaryBetweenMedia.data.ts)

Methodological description: When light passes between media with different optical properties, its speed changes and, at oblique incidence, so does the direction of the light wave.
User-friendly description: Explain how light can change direction at the boundary between media.

##### Distinguish converging and diverging lenses

Slug: distinguishConvergingAndDivergingLenses
Action: create
Status: implemented

[distinguishConvergingAndDivergingLenses.data.ts](../../data/skills/optics/refractionAndLenses/skills/distinguishConvergingAndDivergingLenses.data.ts)

Methodological description: Use a simulation to observe how different lenses change the directions of light rays passing through them.
User-friendly description: Compare lenses that bring light rays together with lenses that spread them apart.

### Radiation

Slug: radiation
Action: create
Status: implemented

Groups: 2 · Skills: 5

[radiation.data.ts](../../data/skills/radiation/radiation.data.ts)

Methodological description: Radiation describes energy transfer from a source through space, including invisible parts of the electromagnetic spectrum and their interaction with matter. Geometric image formation with light belongs to Optics.
User-friendly description: Explore electromagnetic radiation and its interactions with matter.

#### Electromagnetic Radiation

Slug: electromagneticRadiation
Action: create
Status: implemented

Skills: 3

[electromagneticRadiation.data.ts](../../data/skills/radiation/electromagneticRadiation/electromagneticRadiation.data.ts)

Methodological description: Radio waves, infrared, visible, and ultraviolet radiation are different regions of the electromagnetic spectrum.
User-friendly description: Discover visible and invisible parts of the electromagnetic spectrum.

##### Distinguish visible from invisible electromagnetic radiation

Slug: distinguishVisibleFromInvisibleElectromagneticRadiation
Action: create
Status: implemented

[distinguishVisibleFromInvisibleElectromagneticRadiation.data.ts](../../data/skills/radiation/electromagneticRadiation/skills/distinguishVisibleFromInvisibleElectromagneticRadiation.data.ts)

Methodological description: Use lamp light, infrared radiation, and radio waves to demonstrate that not all radiation can be detected by the eye.
User-friendly description: Recognize that radio and infrared waves are not visible to human eyes.

##### Relate familiar types of radiation to the electromagnetic spectrum

Slug: relateFamiliarTypesOfRadiationToTheElectromagneticSpectrum
Action: create
Status: implemented

[relateFamiliarTypesOfRadiationToTheElectromagneticSpectrum.data.ts](../../data/skills/radiation/electromagneticRadiation/skills/relateFamiliarTypesOfRadiationToTheElectromagneticSpectrum.data.ts)

Methodological description: Radio waves, infrared, visible, and ultraviolet radiation occupy positions in the spectrum according to frequency and wavelength; visibility does not determine their physical nature.
User-friendly description: Locate familiar radiation types along the electromagnetic spectrum.

##### Explain the propagation of electromagnetic waves without air

Slug: explainThePropagationOfElectromagneticWavesWithoutAir
Action: create
Status: implemented

[explainThePropagationOfElectromagneticWavesWithoutAir.data.ts](../../data/skills/radiation/electromagneticRadiation/skills/explainThePropagationOfElectromagneticWavesWithoutAir.data.ts)

Methodological description: Use sunlight to explain why electromagnetic radiation can propagate through the vacuum of space.
User-friendly description: Explain why electromagnetic waves travel through the vacuum of space.

#### Radiation and Matter

Slug: radiationAndMatter
Action: create
Status: implemented

Skills: 2

[radiationAndMatter.data.ts](../../data/skills/radiation/radiationAndMatter/radiationAndMatter.data.ts)

Methodological description: Materials can emit, reflect, transmit, or absorb energy; the outcomes depend on the type of radiation and the properties of matter.
User-friendly description: Explore how materials absorb, emit, reflect or transmit radiation.

##### Explain heating through radiation absorption

Slug: explainHeatingThroughRadiationAbsorption
Action: create
Status: implemented

[explainHeatingThroughRadiationAbsorption.data.ts](../../data/skills/radiation/radiationAndMatter/skills/explainHeatingThroughRadiationAbsorption.data.ts)

Methodological description: Using two surfaces in sunlight, relate differences in heating to energy absorption.
User-friendly description: Explain why different surfaces heat differently under the same radiation.

##### Distinguish energy emission from reflection of received light

Slug: distinguishEnergyEmissionFromReflectionOfReceivedLight
Action: create
Status: implemented

[distinguishEnergyEmissionFromReflectionOfReceivedLight.data.ts](../../data/skills/radiation/radiationAndMatter/skills/distinguishEnergyEmissionFromReflectionOfReceivedLight.data.ts)

Methodological description: Using the Sun and Moon, explain that a source emits energy while an illuminated body can reflect it.
User-friendly description: Distinguish light emitted by a source from light reflected by an object.

### Modern Physics

Slug: modernPhysics
Action: create
Status: implemented

Groups: 3 · Skills: 16

[modernPhysics.data.ts](../../data/skills/modernPhysics/modernPhysics.data.ts)

Methodological description: Models of atoms, quantum and nuclear phenomena, and spacetime explain observations not covered by classical physics alone. Younger children can encounter the concepts without mathematical formalism.
User-friendly description: Explore quantum phenomena, nuclear changes and the physics of spacetime.

#### Atoms and Quantum Phenomena

Slug: atomsAndQuantumPhenomena
Action: create
Status: implemented

Skills: 5

[atomsAndQuantumPhenomena.data.ts](../../data/skills/modernPhysics/atomsAndQuantumPhenomena/atomsAndQuantumPhenomena.data.ts)

Methodological description: Atomic models and discrete packets of energy help explain light and properties of matter that cannot be described solely in terms of mechanical motion.
User-friendly description: Discover how atomic structure and quantum behavior differ from classical models.

##### Distinguish an atom from its principal components

Slug: distinguishAnAtomFromItsPrincipalComponents
Action: create
Status: implemented

[distinguishAnAtomFromItsPrincipalComponents.data.ts](../../data/skills/modernPhysics/atomsAndQuantumPhenomena/skills/distinguishAnAtomFromItsPrincipalComponents.data.ts)

Methodological description: An atom consists of a nucleus and an electron cloud; electrons' motion and states do not correspond to literal planetary orbits.
User-friendly description: Recognize atoms as nuclei surrounded by electrons in quantum states.

##### Explain a photon as a quantum of electromagnetic radiation

Slug: explainAPhotonAsAQuantumOfElectromagneticRadiation
Action: create
Status: implemented

[explainAPhotonAsAQuantumOfElectromagneticRadiation.data.ts](../../data/skills/modernPhysics/atomsAndQuantumPhenomena/skills/explainAPhotonAsAQuantumOfElectromagneticRadiation.data.ts)

Methodological description: A photon is a quantum of the electromagnetic field whose energy is related to radiation frequency; it should not be interpreted as a tiny classical ball.
User-friendly description: Understand photons as energy quanta of electromagnetic radiation.

##### Explain light emission by an excited atom

Slug: explainLightEmissionByAnExcitedAtom
Action: create
Status: implemented

[explainLightEmissionByAnExcitedAtom.data.ts](../../data/skills/modernPhysics/atomsAndQuantumPhenomena/skills/explainLightEmissionByAnExcitedAtom.data.ts)

Methodological description: A transition of an atom between energy states may be accompanied by the emission of a photon whose energy is determined by the difference between those states.
User-friendly description: Explain how atoms can emit photons when changing energy levels.

##### Explain wave-like and particle-like behavior of quantum objects

Slug: explainWaveLikeAndParticleLikeBehaviorOfQuantumObjects
Action: create
Status: implemented

[explainWaveLikeAndParticleLikeBehaviorOfQuantumObjects.data.ts](../../data/skills/modernPhysics/atomsAndQuantumPhenomena/skills/explainWaveLikeAndParticleLikeBehaviorOfQuantumObjects.data.ts)

Methodological description: Light and matter exhibit phenomena that cannot be exhaustively described by only a classical wave or a classical particle picture.
User-friendly description: Explore why quantum objects show wave-like and particle-like behavior.

##### Explain discrete atomic energy states

Slug: explainDiscreteAtomicEnergyStates
Action: create
Status: implemented

[explainDiscreteAtomicEnergyStates.data.ts](../../data/skills/modernPhysics/atomsAndQuantumPhenomena/skills/explainDiscreteAtomicEnergyStates.data.ts)

Methodological description: Bound states of an atom have definite energies, and transitions between states involve energy absorption or emission.
User-friendly description: Recognize that atoms have discrete bound energy levels.

#### Nuclear Phenomena

Slug: nuclearPhenomena
Action: create
Status: implemented

Skills: 6

[nuclearPhenomena.data.ts](../../data/skills/modernPhysics/nuclearPhenomena/nuclearPhenomena.data.ts)

Methodological description: Changes in atomic nuclei differ from chemical reactions and may release energy.
User-friendly description: Discover how nuclei change and why some transformations release energy.

##### Distinguish nuclear transformation from chemical change

Slug: distinguishNuclearTransformationFromChemicalChange
Action: create
Status: implemented

[distinguishNuclearTransformationFromChemicalChange.data.ts](../../data/skills/modernPhysics/nuclearPhenomena/skills/distinguishNuclearTransformationFromChemicalChange.data.ts)

Methodological description: A nuclear transformation changes an atom's nucleus, whereas chemical reactions primarily change bonds and electronic structure.
User-friendly description: Distinguish changes inside an atomic nucleus from chemical reactions.

##### Explain radioactivity

Slug: explainRadioactivity
Action: create
Status: implemented

[explainRadioactivity.data.ts](../../data/skills/modernPhysics/nuclearPhenomena/skills/explainRadioactivity.data.ts)

Methodological description: Unstable atomic nuclei spontaneously transform while emitting particles or energy; this is not an ordinary chemical reaction.
User-friendly description: Explain how unstable atomic nuclei undergo radioactive transformations.

##### Distinguish alpha, beta, and gamma radiation

Slug: distinguishAlphaBetaAndGammaRadiation
Action: create
Status: implemented

[distinguishAlphaBetaAndGammaRadiation.data.ts](../../data/skills/modernPhysics/nuclearPhenomena/skills/distinguishAlphaBetaAndGammaRadiation.data.ts)

Methodological description: Alpha radiation consists of helium nuclei, beta radiation of electrons or positrons, and gamma radiation of high-energy photons.
User-friendly description: Recognize alpha particles, beta particles and gamma photons.

##### Explain half-life

Slug: explainHalfLife
Action: create
Status: implemented

[explainHalfLife.data.ts](../../data/skills/modernPhysics/nuclearPhenomena/skills/explainHalfLife.data.ts)

Methodological description: Half-life describes the statistical decline in the number of unstable nuclei in a population, not the lifetime of an individual nucleus.
User-friendly description: Understand half-life as a statistical pattern across many unstable nuclei.

##### Explain nuclear fission

Slug: explainNuclearFission
Action: create
Status: implemented

[explainNuclearFission.data.ts](../../data/skills/modernPhysics/nuclearPhenomena/skills/explainNuclearFission.data.ts)

Methodological description: Heavy nuclei can split into lighter fragments and release energy because of changes in binding energy.
User-friendly description: Explore how splitting heavy nuclei can release energy.

##### Explain nuclear fusion

Slug: explainNuclearFusion
Action: create
Status: implemented

[explainNuclearFusion.data.ts](../../data/skills/modernPhysics/nuclearPhenomena/skills/explainNuclearFusion.data.ts)

Methodological description: Light nuclei can combine under suitable conditions, and changes in binding energy can lead to energy release.
User-friendly description: Explain how combining light nuclei can release energy.

#### Relativity

Slug: relativity
Action: create
Status: implemented

Skills: 5

[relativity.data.ts](../../data/skills/modernPhysics/relativity/relativity.data.ts)

Methodological description: Special relativity describes how measurements of space and time relate to motion, while general relativity describes gravity as spacetime geometry. They should not be confused with the history of astronomy or require formulas in an introductory curriculum.
User-friendly description: Discover how motion and gravity affect measurements of space and time.

##### Explain how the passage of time depends on observers' relative motion

Slug: explainHowThePassageOfTimeDependsOnObserversRelativeMotion
Action: create
Status: implemented

[explainHowThePassageOfTimeDependsOnObserversRelativeMotion.data.ts](../../data/skills/modernPhysics/relativity/skills/explainHowThePassageOfTimeDependsOnObserversRelativeMotion.data.ts)

Methodological description: Using a conceptual model, explain why observers moving relative to one another may measure a time interval differently; this is a physical principle, not an animation-use skill.
User-friendly description: Explore why observers in relative motion may measure different time intervals.

##### Recognize the constancy of the speed of light in vacuum as a principle of special relativity

Slug: recognizeTheConstancyOfTheSpeedOfLightInVacuumAsAPrincipleOfSpecialRelativity
Action: create
Status: implemented

[recognizeTheConstancyOfTheSpeedOfLightInVacuumAsAPrincipleOfSpecialRelativity.data.ts](../../data/skills/modernPhysics/relativity/skills/recognizeTheConstancyOfTheSpeedOfLightInVacuumAsAPrincipleOfSpecialRelativity.data.ts)

Methodological description: Using qualitative models, distinguish the invariant speed of light in vacuum for inertial observers from ordinary addition of speeds of everyday objects.
User-friendly description: Understand the invariant speed of light in vacuum in special relativity.

##### Explain gravity as spacetime curvature

Slug: explainGravityAsSpacetimeCurvature
Action: create
Status: implemented

[explainGravityAsSpacetimeCurvature.data.ts](../../data/skills/modernPhysics/relativity/skills/explainGravityAsSpacetimeCurvature.data.ts)

Methodological description: Recognize the general relativity concept that the distribution of mass and energy affects spacetime geometry; do not treat a rubber-sheet-and-ball analogy as a literal mechanism of gravity.
User-friendly description: Recognize gravity as a consequence of curved spacetime in general relativity.

##### Explain the effect of gravity on the passage of time

Slug: explainTheEffectOfGravityOnThePassageOfTime
Action: create
Status: implemented

[explainTheEffectOfGravityOnThePassageOfTime.data.ts](../../data/skills/modernPhysics/relativity/skills/explainTheEffectOfGravityOnThePassageOfTime.data.ts)

Methodological description: The relative rates of clocks can depend on gravitational potential and observation conditions; this is a physical effect of general relativity.
User-friendly description: Explore how gravity can change the relative rates of clocks.

##### Explain the gravitational deflection of light

Slug: explainTheGravitationalDeflectionOfLight
Action: create
Status: implemented

[explainTheGravitationalDeflectionOfLight.data.ts](../../data/skills/modernPhysics/relativity/skills/explainTheGravitationalDeflectionOfLight.data.ts)

Methodological description: Near massive bodies, spacetime geometry changes light trajectories; this is not refraction at the boundary of two optical media.
User-friendly description: Explain how gravity bends light trajectories without ordinary optical refraction.

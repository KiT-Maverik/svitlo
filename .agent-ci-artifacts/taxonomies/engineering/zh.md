<!-- GENERATED FROM CODE; DO NOT EDIT. -->

# Skills Taxonomy (zh)

> Names and available user-friendly descriptions use the requested locale. Methodological descriptions remain canonical English, not translated. This is a generated Code view, not the editorial staging template.

## SUMMARY

Domains: 18

Groups: 61

Skills: 264

## DOMAINS

### 自动化与机器人技术

Groups: 4 · Skills: 18

[automationAndRobotics.data.ts](../../../content/engineering/data/skills/automationAndRobotics/automationAndRobotics.data.ts)

**Methodological description (English):** Robotic and automated machinery converts physical observations into controlled actions. Engineering competencies concern sensors, actuators, feedback, mechanism geometry and dependable operation; general algorithms and software authoring remain in Informatics.

**User-friendly description (zh):** 了解传感器、控制器和执行器如何使物理系统作出响应。

#### 驱动装置与执行器

Skills: 5

[drivesAndActuators.data.ts](../../../content/engineering/data/skills/automationAndRobotics/drivesAndActuators/drivesAndActuators.data.ts)

**Methodological description (English):** A controller requires suitable physical mechanisms to turn supplied energy into controllable displacement, rotation or force.

**User-friendly description (zh):** 了解由动力驱动的执行器如何移动物理部件。

##### 执行器适用性

[actuatorSuitability.data.ts](../../../content/engineering/data/skills/automationAndRobotics/drivesAndActuators/skills/actuatorSuitability.data.ts)

**Methodological description (English):** Relate required torque, force, travel, speed and duty cycle to an available driving principle and its energy supply.

**User-friendly description (zh):** 根据所需运动、力和工作限制选择执行器。

##### 电动机结构

[electricMotorConstruction.data.ts](../../../content/engineering/data/skills/automationAndRobotics/drivesAndActuators/skills/electricMotorConstruction.data.ts)

**Methodological description (English):** Identify rotor, stator, magnets or windings, bearings and commutation arrangements that produce rotation in an electrical machine. This differs from incorporating a finished motor into a controlled mechanism.

**User-friendly description (zh):** 探索使电动机旋转的内部部件。

##### 限位开关

[limitSwitches.data.ts](../../../content/engineering/data/skills/automationAndRobotics/drivesAndActuators/skills/limitSwitches.data.ts)

**Methodological description (English):** Recognize how end-of-travel signals protect a mechanism from excessive movement.

**User-friendly description (zh):** 识别限位开关如何检测运动行程终点。

##### 电机驱动执行

[motorDrivenActuation.data.ts](../../../content/engineering/data/skills/automationAndRobotics/drivesAndActuators/skills/motorDrivenActuation.data.ts)

**Methodological description (English):** Trace electrical supply and drive control to a rotating mechanical output.

**User-friendly description (zh):** 追踪电机如何产生有用的机械运动。

##### 伺服定位

[servoPositioning.data.ts](../../../content/engineering/data/skills/automationAndRobotics/drivesAndActuators/skills/servoPositioning.data.ts)

**Methodological description (English):** Identify the use of position feedback to command and maintain an actuator's location.

**User-friendly description (zh):** 理解伺服机构如何控制位置。

#### 反馈与控制

Skills: 5

[feedbackAndControl.data.ts](../../../content/engineering/data/skills/automationAndRobotics/feedbackAndControl/feedbackAndControl.data.ts)

**Methodological description (English):** A controlled process needs commands, observations and actuation; feedback can improve regulation but also create delay or oscillation.

**User-friendly description (zh):** 探索利用反馈调节物理过程的系统。

##### 分析控制响应

[analyzeControlResponse.data.ts](../../../content/engineering/data/skills/automationAndRobotics/feedbackAndControl/skills/analyzeControlResponse.data.ts)

**Methodological description (English):** Identify overshoot, steady error, oscillation or excessive delay in observed behavior.

**User-friendly description (zh):** 解释控制系统如何随时间响应变化。

##### 控制架构的权衡

[controlArchitectureTradeOffs.data.ts](../../../content/engineering/data/skills/automationAndRobotics/feedbackAndControl/skills/controlArchitectureTradeOffs.data.ts)

**Methodological description (English):** Compare the robustness, sensing cost, responsiveness and stability implications of open-loop versus feedback control as an engineering architecture decision, not merely a definition quiz.

**User-friendly description (zh):** 根据预期行为和限制比较不同控制方法。

##### 反馈控制回路

[feedbackControlLoops.data.ts](../../../content/engineering/data/skills/automationAndRobotics/feedbackAndControl/skills/feedbackControlLoops.data.ts)

**Methodological description (English):** Locate setpoint, sensor, controller, actuator and physical plant in a working system.

**User-friendly description (zh):** 追踪测得的输出如何返回控制器。

##### 开环控制

[openLoopControl.data.ts](../../../content/engineering/data/skills/automationAndRobotics/feedbackAndControl/skills/openLoopControl.data.ts)

**Methodological description (English):** Describe a control process whose command is set without measuring the resulting output for correction, and explain the consequences of changing loads or other disturbances.

**User-friendly description (zh):** 理解不测量实际结果便运行的控制系统。

##### 安全控制备用方案

[safeControlFallback.data.ts](../../../content/engineering/data/skills/automationAndRobotics/feedbackAndControl/skills/safeControlFallback.data.ts)

**Methodological description (English):** Describe how critical equipment should react to missing power, unreliable sensing or lost communication.

**User-friendly description (zh):** 识别控制系统发生故障时何时必须进入安全状态。

#### 机器人系统

Skills: 4

[robotSystems.data.ts](../../../content/engineering/data/skills/automationAndRobotics/robotSystems/robotSystems.data.ts)

**Methodological description (English):** Robots combine mobile or articulated structure with localization, motion control, power and protection; not all robots operate autonomously.

**User-friendly description (zh):** 学习将机器人视为相互连接的物理子系统进行分析。

##### 评估机器人的安全运行

[evaluateSafeRobotOperation.data.ts](../../../content/engineering/data/skills/automationAndRobotics/robotSystems/skills/evaluateSafeRobotOperation.data.ts)

**Methodological description (English):** Identify guards, speed limits, stop systems or separation required around moving robots.

**User-friendly description (zh):** 评估机器人的工作条件如何影响安全。

##### 识别机器人子系统

[identifyRobotSubsystems.data.ts](../../../content/engineering/data/skills/automationAndRobotics/robotSystems/skills/identifyRobotSubsystems.data.ts)

**Methodological description (English):** Assign roles to structure, power, sensors, actuators and controller in a robot.

**User-friendly description (zh):** 识别机器人中的传感器、控制器、驱动装置和机架。

##### 机器人自由度

[robotDegreesOfFreedom.data.ts](../../../content/engineering/data/skills/automationAndRobotics/robotSystems/skills/robotDegreesOfFreedom.data.ts)

**Methodological description (English):** Connect the axes and joints of a mechanism to its possible independent movements.

**User-friendly description (zh):** 理解自由度如何描述机器人能够进行的运动。

##### 机器人定位硬件

[robotLocalizationHardware.data.ts](../../../content/engineering/data/skills/automationAndRobotics/robotSystems/skills/robotLocalizationHardware.data.ts)

**Methodological description (English):** Describe how sensing surroundings or movement contributes to estimating physical position.

**User-friendly description (zh):** 识别用于估计机器人位置的硬件。

#### 传感器与测量

Skills: 4

[sensorsAndMeasurement.data.ts](../../../content/engineering/data/skills/automationAndRobotics/sensorsAndMeasurement/sensorsAndMeasurement.data.ts)

**Methodological description (English):** Reliable decisions depend on selecting an appropriate measured quantity and understanding how placement, calibration and uncertainty shape the signal.

**User-friendly description (zh):** 学习如何选择、校准和布置传感器。

##### 校准传感器

[calibrateASensor.data.ts](../../../content/engineering/data/skills/automationAndRobotics/sensorsAndMeasurement/skills/calibrateASensor.data.ts)

**Methodological description (English):** Relate device readings to known references and correct or qualify the measurements.

**User-friendly description (zh):** 使用已知参考值校准传感器读数。

##### 解读传感器误差

[interpretSensorError.data.ts](../../../content/engineering/data/skills/automationAndRobotics/sensorsAndMeasurement/skills/interpretSensorError.data.ts)

**Methodological description (English):** Distinguish real changes from drift, limited resolution and random noise.

**User-friendly description (zh):** 理解传感器误差如何影响控制系统的决策。

##### 传感器布置

[sensorPlacement.data.ts](../../../content/engineering/data/skills/automationAndRobotics/sensorsAndMeasurement/skills/sensorPlacement.data.ts)

**Methodological description (English):** Relate position and orientation to what a detector can and cannot observe.

**User-friendly description (zh):** 选择传感器位置，以获得有用且可靠的测量值。

##### 传感器适用性

[sensorSuitability.data.ts](../../../content/engineering/data/skills/automationAndRobotics/sensorsAndMeasurement/skills/sensorSuitability.data.ts)

**Methodological description (English):** Assess the range, measurement principle, response and environmental limitations against a desired physical measurement. Choosing a catalog item is an assessment task, not a distinct Skill.

**User-friendly description (zh):** 为特定测量任务选择合适的传感器。

### 生物医学与辅助工程

Groups: 2 · Skills: 6

[biomedicalAndAssistiveEngineering.data.ts](../../../content/engineering/data/skills/biomedicalAndAssistiveEngineering/biomedicalAndAssistiveEngineering.data.ts)

**Methodological description (English):** Devices supporting, measuring or interacting with human bodies must satisfy suitable physical interfaces, reliability and safe-use constraints. Clinical diagnosis and the biology of the human body remain outside this engineering domain.

**User-friendly description (zh):** 探索支持健康、行动能力和医学测量的技术产品。

#### 辅助与医疗产品

Skills: 3

[assistiveAndMedicalProducts.data.ts](../../../content/engineering/data/skills/biomedicalAndAssistiveEngineering/assistiveAndMedicalProducts/assistiveAndMedicalProducts.data.ts)

**Methodological description (English):** Devices that contact or support human bodies require function, fit and safety considerations beyond an ordinary consumer gadget.

**User-friendly description (zh):** 了解辅助设备和医疗器械的工程功能。

##### 评估医疗器械设计约束

[evaluateMedicalDeviceDesignConstraints.data.ts](../../../content/engineering/data/skills/biomedicalAndAssistiveEngineering/assistiveAndMedicalProducts/skills/evaluateMedicalDeviceDesignConstraints.data.ts)

**Methodological description (English):** Recognize hygiene, safe contact, reliable operation, usability and failure consequences.

**User-friendly description (zh):** 识别医疗设备的安全性、可靠性和使用者需求。

##### 听力辅助设备

[hearingAssistanceDevices.data.ts](../../../content/engineering/data/skills/biomedicalAndAssistiveEngineering/assistiveAndMedicalProducts/skills/hearingAssistanceDevices.data.ts)

**Methodological description (English):** Trace sound pickup, processing, amplification or other output and fitting.

**User-friendly description (zh):** 了解听力辅助设备如何处理或传递声音。

##### 假肢装置的功能

[prostheticDeviceFunctions.data.ts](../../../content/engineering/data/skills/biomedicalAndAssistiveEngineering/assistiveAndMedicalProducts/skills/prostheticDeviceFunctions.data.ts)

**Methodological description (English):** Identify attachment, structural support, alignment and intended functional replacement.

**User-friendly description (zh):** 说明假肢如何替代或辅助身体功能。

#### 医学测量设备

Skills: 3

[medicalMeasurementDevices.data.ts](../../../content/engineering/data/skills/biomedicalAndAssistiveEngineering/medicalMeasurementDevices/medicalMeasurementDevices.data.ts)

**Methodological description (English):** Biomedical devices measure physiological or physical signals with specialized coupling, safety and reliability concerns distinct from ordinary industrial sensing.

**User-friendly description (zh):** 学习设备如何测量生理状态并生成医学影像。

##### 生物医学测量的可靠性

[biomedicalMeasurementReliability.data.ts](../../../content/engineering/data/skills/biomedicalAndAssistiveEngineering/medicalMeasurementDevices/skills/biomedicalMeasurementReliability.data.ts)

**Methodological description (English):** Assess calibration, interference, patient-contact conditions and signal reliability limits relevant to measurements by a medical device.

**User-friendly description (zh):** 识别生物医学测量的局限性和不确定性。

##### 诊断成像硬件

[diagnosticImagingHardware.data.ts](../../../content/engineering/data/skills/biomedicalAndAssistiveEngineering/medicalMeasurementDevices/skills/diagnosticImagingHardware.data.ts)

**Methodological description (English):** Distinguish sources, detectors, positioning and associated hardware in ultrasound, radiographic or magnetic-resonance equipment without teaching clinical image interpretation.

**User-friendly description (zh):** 探索用于医学检查成像的硬件。

##### 生理监测设备

[physiologicalMonitoringDevices.data.ts](../../../content/engineering/data/skills/biomedicalAndAssistiveEngineering/medicalMeasurementDevices/skills/physiologicalMonitoringDevices.data.ts)

**Methodological description (English):** Identify the sensing, acquisition and physical protection subsystems used to measure temperature, electrical activity or oxygen saturation without inferring clinical diagnoses.

**User-friendly description (zh):** 追踪监测设备如何把物理信号转换成测量结果。

### 仿生学

Groups: 2 · Skills: 8

[biomimicry.data.ts](../../../content/engineering/data/skills/biomimicry/biomimicry.data.ts)

**Methodological description (English):** Nature-inspired engineering abstracts useful functional strategies from living systems and subjects technical adaptations to testing. Evolution is not intentional design, and merely studying an organism is not itself an engineering competency.

**User-friendly description (zh):** 探索大自然解决问题的方式如何启发有用的技术设计。

#### 仿生技术

Skills: 4

[bioInspiredTechnologies.data.ts](../../../content/engineering/data/skills/biomimicry/bioInspiredTechnologies/bioInspiredTechnologies.data.ts)

**Methodological description (English):** Distinct examples show recurring design strategies, not a separate Skill for every organism.

**User-friendly description (zh):** 探索受生物形态和表面结构启发的设备与材料。

##### 仿生附着机制

[bioInspiredAttachment.data.ts](../../../content/engineering/data/skills/biomimicry/bioInspiredTechnologies/skills/bioInspiredAttachment.data.ts)

**Methodological description (English):** Relate hooks or structured surfaces to engineered removable fasteners or adhesion.

**User-friendly description (zh):** 探索受生物体启发的附着装置。

##### 仿生流线设计

[biomimeticStreamlining.data.ts](../../../content/engineering/data/skills/biomimicry/bioInspiredTechnologies/skills/biomimeticStreamlining.data.ts)

**Methodological description (English):** Relate a biological shape to a proposed drag-reducing vehicle design requiring testing.

**User-friendly description (zh):** 认识生物形状如何减少技术设计中的流体阻力。

##### 轻质仿生结构

[lightweightBioInspiredStructures.data.ts](../../../content/engineering/data/skills/biomimicry/bioInspiredTechnologies/skills/lightweightBioInspiredStructures.data.ts)

**Methodological description (English):** Identify shells, cellular patterns or branching that motivate efficient material placement.

**User-friendly description (zh):** 探索自然结构如何启发轻而坚固的工程形态。

##### 自清洁表面

[selfCleaningSurfaces.data.ts](../../../content/engineering/data/skills/biomimicry/bioInspiredTechnologies/skills/selfCleaningSurfaces.data.ts)

**Methodological description (English):** Connect surface texture and wetting behavior with liquid and dirt removal.

**User-friendly description (zh):** 了解天然表面结构如何启发自清洁材料。

#### 自然启发的设计

Skills: 4

[natureInspiredDesign.data.ts](../../../content/engineering/data/skills/biomimicry/natureInspiredDesign/natureInspiredDesign.data.ts)

**Methodological description (English):** A valid biological analogy extracts a function and tests whether it can work with different materials, geometry and scale.

**User-friendly description (zh):** 学习把生物功能转化为工程原理。

##### 抽象提炼生物原理

[abstractABiologicalPrinciple.data.ts](../../../content/engineering/data/skills/biomimicry/natureInspiredDesign/skills/abstractABiologicalPrinciple.data.ts)

**Methodological description (English):** Separate a transferable mechanism from the organism's particular form or habitat.

**User-friendly description (zh):** 描述生物机制，而不照搬无关的自然细节。

##### 将自然原理应用于设计

[applyANaturalPrincipleToADesign.data.ts](../../../content/engineering/data/skills/biomimicry/natureInspiredDesign/skills/applyANaturalPrincipleToADesign.data.ts)

**Methodological description (English):** Propose a technical arrangement based on an identified biological mechanism.

**User-friendly description (zh):** 运用从自然界观察到的原理开发技术解决方案。

##### 评估仿生设计的性能

[evaluateBiomimeticPerformance.data.ts](../../../content/engineering/data/skills/biomimicry/natureInspiredDesign/skills/evaluateBiomimeticPerformance.data.ts)

**Methodological description (English):** Compare a resulting prototype with functional criteria and acknowledge limitations of the analogy.

**User-friendly description (zh):** 检验仿照自然原理的设计是否真正达到性能目标。

##### 识别生物的功能策略

[identifyFunctionalBiologicalStrategies.data.ts](../../../content/engineering/data/skills/biomimicry/natureInspiredDesign/skills/identifyFunctionalBiologicalStrategies.data.ts)

**Methodological description (English):** Describe the useful effect of a natural structure without portraying evolution as intentional invention.

**User-friendly description (zh):** 找出生物如何解决某种功能问题。

### 通信与测量设备

Groups: 3 · Skills: 13

[communicationAndMeasurementDevices.data.ts](../../../content/engineering/data/skills/communicationAndMeasurementDevices/communicationAndMeasurementDevices.data.ts)

**Methodological description (English):** Radio, optical and navigation equipment generates, propagates, detects and uses physical signals. Competencies concern real emitters, interfaces, receivers and instrumentation, rather than networking programs or generic data-processing algorithms.

**User-friendly description (zh):** 探索能够传输信号、形成图像和确定位置的物理设备。

#### 通信硬件

Skills: 5

[communicationHardware.data.ts](../../../content/engineering/data/skills/communicationAndMeasurementDevices/communicationHardware/communicationHardware.data.ts)

**Methodological description (English):** Physical communication chains depend on transducers, suitable electromagnetic or wired paths and receiving equipment.

**User-friendly description (zh):** 了解发送和接收信息的物理部件。

##### 天线的功能

[antennaFunctions.data.ts](../../../content/engineering/data/skills/communicationAndMeasurementDevices/communicationHardware/skills/antennaFunctions.data.ts)

**Methodological description (English):** Relate antenna coupling, placement and orientation to the intended link.

**User-friendly description (zh):** 探索天线如何将信号与电磁波耦合。

##### 通信基础设施

[communicationsInfrastructure.data.ts](../../../content/engineering/data/skills/communicationAndMeasurementDevices/communicationHardware/skills/communicationsInfrastructure.data.ts)

**Methodological description (English):** Identify the roles of repeaters, base stations and backhaul links in providing coverage.

**User-friendly description (zh):** 理解通信链路为何依赖互联的基础设施。

##### 无线电接收机

[radioReceivers.data.ts](../../../content/engineering/data/skills/communicationAndMeasurementDevices/communicationHardware/skills/radioReceivers.data.ts)

**Methodological description (English):** Trace how an antenna and receiving electronics select and recover useful information from a received signal.

**User-friendly description (zh):** 认识接收机如何选择并解读无线电信号。

##### 无线电发射机

[radioTransmitters.data.ts](../../../content/engineering/data/skills/communicationAndMeasurementDevices/communicationHardware/skills/radioTransmitters.data.ts)

**Methodological description (English):** Trace how circuitry prepares a signal and supplies suitable electrical excitation to an antenna for radiation.

**User-friendly description (zh):** 理解无线电发射机主要部件的作用。

##### 追踪通信信号链

[traceACommunicationSignalChain.data.ts](../../../content/engineering/data/skills/communicationAndMeasurementDevices/communicationHardware/skills/traceACommunicationSignalChain.data.ts)

**Methodological description (English):** Identify input conversion, transmission, propagation, reception and output in a practical link.

**User-friendly description (zh):** 追踪信号从发射、传播到接收的过程。

#### 导航设备

Skills: 3

[navigationEquipment.data.ts](../../../content/engineering/data/skills/communicationAndMeasurementDevices/navigationEquipment/navigationEquipment.data.ts)

**Methodological description (English):** Positioning methods use different physical measurements, and each has characteristic failures and accuracy limitations.

**User-friendly description (zh):** 探索用于导航和定位的实际硬件。

##### 比较定位方法

[comparePositioningMethods.data.ts](../../../content/engineering/data/skills/communicationAndMeasurementDevices/navigationEquipment/skills/comparePositioningMethods.data.ts)

**Methodological description (English):** Relate satellite, inertial and local-reference approaches to interference, coverage and drift.

**User-friendly description (zh):** 比较定位技术及其工作限制。

##### 惯性导航硬件

[inertialNavigationHardware.data.ts](../../../content/engineering/data/skills/communicationAndMeasurementDevices/navigationEquipment/skills/inertialNavigationHardware.data.ts)

**Methodological description (English):** Identify accelerometers and gyroscopes and the accumulation of estimation error.

**User-friendly description (zh):** 认识惯性传感器如何估计运动和方向的变化。

##### 卫星导航接收机

[satelliteNavigationReceivers.data.ts](../../../content/engineering/data/skills/communicationAndMeasurementDevices/navigationEquipment/skills/satelliteNavigationReceivers.data.ts)

**Methodological description (English):** Recognize how timing signals from multiple satellites support location and time estimates.

**User-friendly description (zh):** 理解卫星导航接收机如何使用传输来的信号。

#### 光学设备

Skills: 5

[opticalDevices.data.ts](../../../content/engineering/data/skills/communicationAndMeasurementDevices/opticalDevices/opticalDevices.data.ts)

**Methodological description (English):** Optical components manipulate or detect light for imaging, sensing and transmission; lasers require particular source and exposure precautions.

**User-friendly description (zh):** 了解光学装置如何操控光线以成像和通信。

##### 相机硬件

[cameraHardware.data.ts](../../../content/engineering/data/skills/communicationAndMeasurementDevices/opticalDevices/skills/cameraHardware.data.ts)

**Methodological description (English):** Trace light through an optical path onto an image sensor, apart from software image processing.

**User-friendly description (zh):** 追踪相机的光学系统和传感器如何形成图像。

##### 光纤通信系统

[fiberOpticCommunicationSystems.data.ts](../../../content/engineering/data/skills/communicationAndMeasurementDevices/opticalDevices/skills/fiberOpticCommunicationSystems.data.ts)

**Methodological description (English):** Identify source, fiber path, connectors and receiver in an optical link.

**User-friendly description (zh):** 认识光纤在传输信息中的作用。

##### 识别激光设备的危险

[identifyLaserDeviceHazards.data.ts](../../../content/engineering/data/skills/communicationAndMeasurementDevices/opticalDevices/skills/identifyLaserDeviceHazards.data.ts)

**Methodological description (English):** Connect beam intensity and reflection paths with protective measures and controlled operation.

**User-friendly description (zh):** 识别不安全的激光设备可能造成的危险。

##### 激光设备结构

[laserDeviceArchitecture.data.ts](../../../content/engineering/data/skills/communicationAndMeasurementDevices/opticalDevices/skills/laserDeviceArchitecture.data.ts)

**Methodological description (English):** Identify an energized gain medium, light amplification and relevant resonator or output optics.

**User-friendly description (zh):** 识别激光设备的主要组成部分。

##### 光学元件适用性

[opticalComponentSuitability.data.ts](../../../content/engineering/data/skills/communicationAndMeasurementDevices/opticalDevices/skills/opticalComponentSuitability.data.ts)

**Methodological description (English):** Assess the functional fit of lenses, mirrors, filters or detectors for an imaging, transmission or measurement purpose.

**User-friendly description (zh):** 根据所需功能比较光学元件。

### 电气与电子工程

Groups: 5 · Skills: 27

[electricalAndElectronicEngineering.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/electricalAndElectronicEngineering.data.ts)

**Methodological description (English):** Circuits and electronic hardware distribute power, process signals and connect physical controls to useful outputs. The subject here is device architecture and correct component integration, not the scientific derivation of electromagnetic laws.

**User-friendly description (zh):** 探索电气与电子硬件如何制造、测量和保护。

#### 电路构建

Skills: 5

[circuitConstruction.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/circuitConstruction/circuitConstruction.data.ts)

**Methodological description (English):** A functioning assembly requires compatible sources, loads and connections, including means of switching and independent distribution.

**User-friendly description (zh):** 了解如何根据电路图搭建实际电路。

##### 组装低压电路

[assembleALowVoltageCircuit.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/circuitConstruction/skills/assembleALowVoltageCircuit.data.ts)

**Methodological description (English):** Connect a suitable power source and load with correctly rated components while avoiding shorts.

**User-friendly description (zh):** 使用安全的低压元件组装简单电路。

##### 设计开关电路

[designASwitchingCircuit.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/circuitConstruction/skills/designASwitchingCircuit.data.ts)

**Methodological description (English):** Place controls so a load can be energized or interrupted deliberately.

**User-friendly description (zh):** 规划一个可以接通和断开负载的电路。

##### 解读电路图

[interpretCircuitDiagrams.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/circuitConstruction/skills/interpretCircuitDiagrams.data.ts)

**Methodological description (English):** Read the symbols, electrical junctions and conductive paths specific to circuit diagrams, including when apparent crossing wires are not electrically connected. This is more specialized than reading general technical schematics.

**User-friendly description (zh):** 阅读电气图纸上的元件符号和连接关系。

##### 并联电路结构

[parallelCircuitArrangements.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/circuitConstruction/skills/parallelCircuitArrangements.data.ts)

**Methodological description (English):** Identify separate supply branches and why loads can operate independently.

**User-friendly description (zh):** 理解并联支路两端电压相同的原因。

##### 串联电路结构

[seriesCircuitArrangements.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/circuitConstruction/skills/seriesCircuitArrangements.data.ts)

**Methodological description (English):** Identify how interruption of one common current path affects dependent loads.

**User-friendly description (zh):** 识别串联连接只有一条电流路径的特点。

#### 计算机硬件

Skills: 9

[computingHardware.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/computingHardware/computingHardware.data.ts)

**Methodological description (English):** Computer hardware combines execution, working memory, persistent storage, electrical interconnects, human input/output and power and thermal management. It is distinct from programming, operating systems and software data structures.

**User-friendly description (zh):** 探索计算设备的物理组成部分。

##### 计算机硬件总线

[computerHardwareBuses.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/computingHardware/skills/computerHardwareBuses.data.ts)

**Methodological description (English):** Describe the communication pathways and electrical interfaces joining processors, memory controllers and peripheral equipment.

**User-friendly description (zh):** 了解总线如何传送计算机内部组件间的数据。

##### 计算机供电架构

[computerPowerSupplyArchitecture.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/computingHardware/skills/computerPowerSupplyArchitecture.data.ts)

**Methodological description (English):** Trace conversion, regulation and distribution of the electrical supply to devices with differing voltage and current needs.

**User-friendly description (zh):** 了解计算机如何转换电能并向各部件分配电力。

##### 计算机热管理

[computerThermalManagement.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/computingHardware/skills/computerThermalManagement.data.ts)

**Methodological description (English):** Relate computer component heat production to cooling paths, heat sinks, airflow and protection against excessive temperature.

**User-friendly description (zh):** 解释为什么计算机硬件需要冷却和散热管理。

##### 显示硬件

[displayHardware.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/computingHardware/skills/displayHardware.data.ts)

**Methodological description (English):** Identify the physical image-forming panel, drive electronics and light-emission or modulation mechanisms independently from displayed software content.

**User-friendly description (zh):** 识别显示屏的主要硬件部件及其功能。

##### 输入设备硬件

[inputDeviceHardware.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/computingHardware/skills/inputDeviceHardware.data.ts)

**Methodological description (English):** Explain how mechanical switches, touch sensing or pointing-device transducers convert user actions into electrical signals.

**User-friendly description (zh):** 探索键盘、传感器等输入设备如何将操作转换为计算机输入信号。

##### 主存储器硬件

[mainMemoryHardware.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/computingHardware/skills/mainMemoryHardware.data.ts)

**Methodological description (English):** Distinguish operational random-access memory from persistent storage using volatility, capacity, latency and connection to processing hardware.

**User-friendly description (zh):** 了解主存储器如何暂时保存运行中的数据。

##### 持久数据存储

[persistentDataStorage.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/computingHardware/skills/persistentDataStorage.data.ts)

**Methodological description (English):** Relate solid-state or magnetic storage media and controllers to retention, transfer, access performance and device reliability.

**User-friendly description (zh):** 比较断电后仍能保存信息的不同物理存储介质。

##### 印制电路板连接

[printedCircuitBoardInterconnects.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/computingHardware/skills/printedCircuitBoardInterconnects.data.ts)

**Methodological description (English):** Trace physical conductive pathways and connector functions that distribute signals and electrical power between mounted components.

**User-friendly description (zh):** 沿着印制电路板上的导电线路追踪电气连接。

##### 处理器硬件

[processorHardware.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/computingHardware/skills/processorHardware.data.ts)

**Methodological description (English):** Identify the functions of processing units, registers and internal interfaces in executing machine operations without confusing hardware architecture with the algorithms it runs.

**User-friendly description (zh):** 了解处理器执行指令时使用的物理部件。

#### 电气测量与保护

Skills: 5

[electricalMeasurementAndProtection.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/electricalMeasurementAndProtection/electricalMeasurementAndProtection.data.ts)

**Methodological description (English):** Measurements must be connected correctly, while protective devices prevent harmful operating conditions rather than simply switching equipment normally.

**User-friendly description (zh):** 了解电气测量与保护装置如何提高安全性。

##### 电气隔离

[electricalIsolation.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/electricalMeasurementAndProtection/skills/electricalIsolation.data.ts)

**Methodological description (English):** Describe how barriers or isolating components prevent unintended conductive paths between circuits, including hazardous interfaces.

**User-friendly description (zh):** 认识电气隔离为何能保护不同电路和使用者。

##### 测量电路电流

[measureCircuitCurrent.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/electricalMeasurementAndProtection/skills/measureCircuitCurrent.data.ts)

**Methodological description (English):** Choose an appropriate sensing method and insertion point for a selected branch.

**User-friendly description (zh):** 测量流经电路的电流，并避免错误连接仪表。

##### 测量电路电压

[measureCircuitVoltage.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/electricalMeasurementAndProtection/skills/measureCircuitVoltage.data.ts)

**Methodological description (English):** Use a suitable meter across selected terminals to determine a potential difference.

**User-friendly description (zh):** 安全测量电路中两点之间的电势差。

##### 过电流保护

[overcurrentProtection.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/electricalMeasurementAndProtection/skills/overcurrentProtection.data.ts)

**Methodological description (English):** Recognize how properly rated fuses or breakers interrupt damaging excessive current.

**User-friendly description (zh):** 解释熔断器和断路器如何限制危险的过电流。

##### 保护接地

[protectiveGrounding.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/electricalMeasurementAndProtection/skills/protectiveGrounding.data.ts)

**Methodological description (English):** Identify intentional fault-current or equipotential connections that reduce electric-shock risk in appropriately designed equipment.

**User-friendly description (zh):** 理解保护接地如何提高电气安全性。

#### 电子元件

Skills: 4

[electronicComponents.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/electronicComponents/electronicComponents.data.ts)

**Methodological description (English):** Components can limit, store, steer or switch electrical signals; their appropriate use depends on ratings and surrounding circuit context.

**User-friendly description (zh):** 学习常见电子元件的功能。

##### 电容器的应用

[capacitorApplications.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/electronicComponents/skills/capacitorApplications.data.ts)

**Methodological description (English):** Relate short-term charge storage to smoothing, filtering or timing in electronics.

**User-friendly description (zh):** 理解电容器如何储存并释放电荷。

##### 二极管的应用

[diodeApplications.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/electronicComponents/skills/diodeApplications.data.ts)

**Methodological description (English):** Relate directional conduction, rectification or light emission to practical circuits.

**User-friendly description (zh):** 理解二极管主要允许电流沿一个方向流动的原因。

##### 电阻器的应用

[resistorApplications.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/electronicComponents/skills/resistorApplications.data.ts)

**Methodological description (English):** Identify current limiting, biasing and voltage division as different practical uses.

**User-friendly description (zh):** 探索电阻器为何能限制电流并分配电压。

##### 晶体管开关

[transistorSwitching.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/electronicComponents/skills/transistorSwitching.data.ts)

**Methodological description (English):** Trace how a relatively small control input governs another electrical path.

**User-friendly description (zh):** 使用晶体管作为受电子信号控制的开关。

#### 嵌入式硬件

Skills: 4

[embeddedHardware.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/embeddedHardware/embeddedHardware.data.ts)

**Methodological description (English):** Controllers communicate with sensors and actuators through real physical interfaces; programming concepts are treated separately in Informatics.

**User-friendly description (zh):** 探索嵌入式控制装置中使用的硬件连接方式。

##### 执行器驱动兼容性

[actuatorDriverCompatibility.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/embeddedHardware/skills/actuatorDriverCompatibility.data.ts)

**Methodological description (English):** Determine whether voltage, current, protection and command characteristics suit the drive and the expected actuator load.

**User-friendly description (zh):** 识别何时执行器需要合适的驱动电路。

##### 硬件输入输出接口

[hardwareInputOutputInterfaces.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/embeddedHardware/skills/hardwareInputOutputInterfaces.data.ts)

**Methodological description (English):** Distinguish real electrical signaling and connector limitations from software data semantics.

**User-friendly description (zh):** 理解硬件输入和输出接口如何连接设备。

##### 微控制器架构

[microcontrollerArchitecture.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/embeddedHardware/skills/microcontrollerArchitecture.data.ts)

**Methodological description (English):** Identify processor, memory, supply and hardware interfaces in a dedicated controller.

**User-friendly description (zh):** 识别微控制器中的处理器、存储器和外围硬件。

##### 传感器接口兼容性

[sensorInterfaceCompatibility.data.ts](../../../content/engineering/data/skills/electricalAndElectronicEngineering/embeddedHardware/skills/sensorInterfaceCompatibility.data.ts)

**Methodological description (English):** Assess whether a sensor output, supply voltage, signal level and timing are compatible with a particular data acquisition input.

**User-friendly description (zh):** 检查传感器信号是否满足控制器输入要求。

### 能源系统

Groups: 3 · Skills: 12

[energySystems.data.ts](../../../content/engineering/data/skills/energySystems/energySystems.data.ts)

**Methodological description (English):** Useful energy services depend on conversion, storage, power delivery and load management. The engineering emphasis is on connected equipment and operational limitations, while the principles of energy conservation belong to Physics.

**User-friendly description (zh):** 探索工程系统如何生产、储存、输送和使用能源。

#### 能源性能

Skills: 3

[energyPerformance.data.ts](../../../content/engineering/data/skills/energySystems/energyPerformance/energyPerformance.data.ts)

**Methodological description (English):** Consumption varies over time, and practical output is less than input when converters or networks lose energy.

**User-friendly description (zh):** 探索工程师如何估算需求并提高能源利用性能。

##### 估算能源需求

[estimateEnergyDemand.data.ts](../../../content/engineering/data/skills/energySystems/energyPerformance/skills/estimateEnergyDemand.data.ts)

**Methodological description (English):** Combine device power and operating duration to assess required supply or storage.

**User-friendly description (zh):** 估计设备或系统运行所需的能源量。

##### 评估能源效率

[evaluateEnergyEfficiency.data.ts](../../../content/engineering/data/skills/energySystems/energyPerformance/skills/evaluateEnergyEfficiency.data.ts)

**Methodological description (English):** Compare useful device output with energy input and identify major losses.

**User-friendly description (zh):** 评估系统能否高效地提供有用输出。

##### 负载均衡

[loadBalancing.data.ts](../../../content/engineering/data/skills/energySystems/energyPerformance/skills/loadBalancing.data.ts)

**Methodological description (English):** Recognize why generation, storage and demand must be coordinated across time.

**User-friendly description (zh):** 理解平衡供需如何帮助电力系统运行。

#### 发电

Skills: 5

[generation.data.ts](../../../content/engineering/data/skills/energySystems/generation/generation.data.ts)

**Methodological description (English):** Electricity and heat can be produced through different converter chains with distinct resource and operating constraints.

**User-friendly description (zh):** 探索生产电力的不同技术方法。

##### 发电机

[electricalGenerators.data.ts](../../../content/engineering/data/skills/energySystems/generation/skills/electricalGenerators.data.ts)

**Methodological description (English):** Trace mechanical input to electricity through a generator assembly.

**User-friendly description (zh):** 理解机械旋转如何驱动发电机。

##### 水力发电设施

[hydropowerInstallations.data.ts](../../../content/engineering/data/skills/energySystems/generation/skills/hydropowerInstallations.data.ts)

**Methodological description (English):** Follow water through a turbine and generator toward discharge.

**User-friendly description (zh):** 理解流动的水如何驱动水力发电设备。

##### 光伏系统

[photovoltaicSystems.data.ts](../../../content/engineering/data/skills/energySystems/generation/skills/photovoltaicSystems.data.ts)

**Methodological description (English):** Identify modules and power electronics used to produce usable electricity from sunlight.

**User-friendly description (zh):** 解释太阳能电池如何把照射到的光转换为电能。

##### 火力发电站

[thermalPowerStations.data.ts](../../../content/engineering/data/skills/energySystems/generation/skills/thermalPowerStations.data.ts)

**Methodological description (English):** Trace a heat source and working process to a generator rather than assuming a single fuel.

**User-friendly description (zh):** 探索热电厂如何将热转化为电力。

##### 风力涡轮机

[windTurbines.data.ts](../../../content/engineering/data/skills/energySystems/generation/skills/windTurbines.data.ts)

**Methodological description (English):** Trace rotor, drive and generator functions within a wind-energy installation.

**User-friendly description (zh):** 追踪风力涡轮机如何驱动发电机。

#### 能源储存与输送

Skills: 4

[storageAndDelivery.data.ts](../../../content/engineering/data/skills/energySystems/storageAndDelivery/storageAndDelivery.data.ts)

**Methodological description (English):** Reliable supply requires matching time, location and suitable electrical or thermal interfaces.

**User-friendly description (zh):** 了解能源如何储存并输送给用户。

##### 电网配电

[electricalGridDistribution.data.ts](../../../content/engineering/data/skills/energySystems/storageAndDelivery/skills/electricalGridDistribution.data.ts)

**Methodological description (English):** Trace energy from generation through substations and delivery networks to loads.

**User-friendly description (zh):** 追踪电力从发电厂经过配电网络的路径。

##### 可充电电池系统

[rechargeableBatterySystems.data.ts](../../../content/engineering/data/skills/energySystems/storageAndDelivery/skills/rechargeableBatterySystems.data.ts)

**Methodological description (English):** Identify cells, charging control and protective elements in practical energy storage.

**User-friendly description (zh):** 认识可充电电池系统的组成部分及运行限制。

##### 热能储存

[thermalEnergyStorage.data.ts](../../../content/engineering/data/skills/energySystems/storageAndDelivery/skills/thermalEnergyStorage.data.ts)

**Methodological description (English):** Describe how heat or cooling can be retained for later use.

**User-friendly description (zh):** 比较把热量储存起来供以后使用的不同方法。

##### 变压器的用途

[transformerUse.data.ts](../../../content/engineering/data/skills/energySystems/storageAndDelivery/skills/transformerUse.data.ts)

**Methodological description (English):** Relate changing AC voltage levels to efficient transfer and equipment requirements.

**User-friendly description (zh):** 理解电网为何使用变压器改变电压。

### 工程设计

Groups: 4 · Skills: 22

[engineeringDesign.data.ts](../../../content/engineering/data/skills/engineeringDesign/engineeringDesign.data.ts)

**Methodological description (English):** A design must respond to an actual need, not merely demonstrate a technology. This domain concerns converting uncertain problems into requirements, selecting feasible concepts, communicating designs and improving them using evidence.

**User-friendly description (zh):** 学习开发、测试和改进满足实际需求的技术方案。

#### 方案选择

Skills: 5

[conceptSelection.data.ts](../../../content/engineering/data/skills/engineeringDesign/conceptSelection/conceptSelection.data.ts)

**Methodological description (English):** Competing technical arrangements can meet the same need in different ways; choosing responsibly requires functional comparison and defensible compromises.

**User-friendly description (zh):** 学习比较满足某种技术需求的不同方式。

##### 预判故障模式

[anticipateFailureModes.data.ts](../../../content/engineering/data/skills/engineeringDesign/conceptSelection/skills/anticipateFailureModes.data.ts)

**Methodological description (English):** Predict credible ways a proposed arrangement might fail to deliver its intended function.

**User-friendly description (zh):** 预测设计在使用过程中可能出现的合理故障。

##### 比较设计备选方案

[compareDesignAlternatives.data.ts](../../../content/engineering/data/skills/engineeringDesign/conceptSelection/skills/compareDesignAlternatives.data.ts)

**Methodological description (English):** Use stated criteria to evaluate the advantages and limitations of candidate concepts.

**User-friendly description (zh):** 根据明确规定的标准比较候选设计。

##### 分解设计问题

[decomposeADesignProblem.data.ts](../../../content/engineering/data/skills/engineeringDesign/conceptSelection/skills/decomposeADesignProblem.data.ts)

**Methodological description (English):** Separate a large objective into subsystems or functions with defined interactions.

**User-friendly description (zh):** 把复杂设计分解成相互关联的小功能。

##### 提出替代设计方案

[generateAlternativeDesignConcepts.data.ts](../../../content/engineering/data/skills/engineeringDesign/conceptSelection/skills/generateAlternativeDesignConcepts.data.ts)

**Methodological description (English):** Propose more than one functional approach to a need rather than only cosmetic variations of one approach.

**User-friendly description (zh):** 针对同一个设计挑战，提出不同的功能实现方法。

##### 说明设计取舍的理由

[justifyADesignTradeOff.data.ts](../../../content/engineering/data/skills/engineeringDesign/conceptSelection/skills/justifyADesignTradeOff.data.ts)

**Methodological description (English):** Explain an accepted sacrifice, such as extra mass in exchange for greater strength.

**User-friendly description (zh):** 解释为什么改善一项特性可能需要牺牲另一项。

#### 问题定义

Skills: 5

[problemDefinition.data.ts](../../../content/engineering/data/skills/engineeringDesign/problemDefinition/problemDefinition.data.ts)

**Methodological description (English):** A clear brief distinguishes what needs to change, how success will be measured and which resources or conditions constrain possible solutions.

**User-friendly description (zh):** 了解明确的要求如何成为成功设计的起点。

##### 制定性能标准

[definePerformanceCriteria.data.ts](../../../content/engineering/data/skills/engineeringDesign/problemDefinition/skills/definePerformanceCriteria.data.ts)

**Methodological description (English):** State observable success conditions such as load capacity, flow, travel, access or power consumption.

**User-friendly description (zh):** 制定可测量的结果，用来判断设计是否成功。

##### 表述设计问题

[formulateADesignProblem.data.ts](../../../content/engineering/data/skills/engineeringDesign/problemDefinition/skills/formulateADesignProblem.data.ts)

**Methodological description (English):** Specify the required function, intended users and operating context without predetermining the technical solution.

**User-friendly description (zh):** 说明技术解决方案必须完成什么任务，以及谁会使用它。

##### 识别工程需求

[identifyAnEngineeringNeed.data.ts](../../../content/engineering/data/skills/engineeringDesign/problemDefinition/skills/identifyAnEngineeringNeed.data.ts)

**Methodological description (English):** Recognize a practical problem or unmet function in a physical product or environment rather than assuming a particular invention is necessary.

**User-friendly description (zh):** 识别工程技术有可能解决的实际需求。

##### 识别设计约束

[identifyDesignConstraints.data.ts](../../../content/engineering/data/skills/engineeringDesign/problemDefinition/skills/identifyDesignConstraints.data.ts)

**Methodological description (English):** Recognize limits imposed by cost, materials, dimensions, time, safety and operating environment.

**User-friendly description (zh):** 识别成本、材料、空间和安全等方面的限制。

##### 确定需求优先级

[prioritizeRequirements.data.ts](../../../content/engineering/data/skills/engineeringDesign/problemDefinition/skills/prioritizeRequirements.data.ts)

**Methodological description (English):** Separate essential conditions from preferred attributes when several goals compete.

**User-friendly description (zh):** 判断哪些要求是必要的，哪些是可选的。

#### 技术表达与原型

Skills: 5

[representationsAndPrototypes.data.ts](../../../content/engineering/data/skills/engineeringDesign/representationsAndPrototypes/representationsAndPrototypes.data.ts)

**Methodological description (English):** Technical representations communicate geometry, operation and interfaces. A model is useful when it preserves properties that matter to the question being investigated.

**User-friendly description (zh):** 了解图纸和原型如何传达技术方案。

##### 制作功能原型

[buildAFunctionalPrototype.data.ts](../../../content/engineering/data/skills/engineeringDesign/representationsAndPrototypes/skills/buildAFunctionalPrototype.data.ts)

**Methodological description (English):** Make a physical or computational representation that can demonstrate or investigate a specified design feature.

**User-friendly description (zh):** 制作能够测试或展示某个具体设计构想的模型。

##### 绘制标注尺寸的图纸

[createADimensionedDrawing.data.ts](../../../content/engineering/data/skills/engineeringDesign/representationsAndPrototypes/skills/createADimensionedDrawing.data.ts)

**Methodological description (English):** Specify relevant sizes and geometric relations so another person could reproduce a part.

**User-friendly description (zh):** 绘制零件并标注尺寸，以传达预定大小。

##### 绘制功能框图

[createAFunctionalBlockDiagram.data.ts](../../../content/engineering/data/skills/engineeringDesign/representationsAndPrototypes/skills/createAFunctionalBlockDiagram.data.ts)

**Methodological description (English):** Show key units and the direction of energy, material or signal flow between them.

**User-friendly description (zh):** 绘制图示，表示部件以及能量、材料或信号的流动。

##### 设计依据

[designRationale.data.ts](../../../content/engineering/data/skills/engineeringDesign/representationsAndPrototypes/skills/designRationale.data.ts)

**Methodological description (English):** Communicate why components, arrangements and dimensions were chosen in relation to requirements.

**User-friendly description (zh):** 解释设计为何采用特定的部件和布置方式。

##### 解读技术系统原理图

[interpretTechnicalSystemSchematics.data.ts](../../../content/engineering/data/skills/engineeringDesign/representationsAndPrototypes/skills/interpretTechnicalSystemSchematics.data.ts)

**Methodological description (English):** Interpret functional symbols and relationships in mechanical, hydraulic, pneumatic or block diagrams. Specialized electrical-circuit connectivity and electrical symbols have a separate competency.

**User-friendly description (zh):** 通过阅读图纸理解技术组件之间的关系。

#### 测试与迭代

Skills: 7

[testingAndIteration.data.ts](../../../content/engineering/data/skills/engineeringDesign/testingAndIteration/testingAndIteration.data.ts)

**Methodological description (English):** A plausible prototype is not proof of performance. Measurement, failure analysis and controlled revisions provide a basis for improving the proposed product.

**User-friendly description (zh):** 利用测试数据改进原型，并验证它是否符合目的。

##### 诊断原型故障

[diagnoseAPrototypeFailure.data.ts](../../../content/engineering/data/skills/engineeringDesign/testingAndIteration/skills/diagnoseAPrototypeFailure.data.ts)

**Methodological description (English):** Use symptoms and component relationships to identify a plausible cause of poor performance.

**User-friendly description (zh):** 调查哪个部件或工作条件可能导致原型故障。

##### 评估原型性能

[evaluatePrototypePerformance.data.ts](../../../content/engineering/data/skills/engineeringDesign/testingAndIteration/skills/evaluatePrototypePerformance.data.ts)

**Methodological description (English):** Interpret observed prototype-test results under defined conditions and compare measured outputs with expected performance. This analysis alone does not establish full design verification or validate user needs.

**User-friendly description (zh):** 将原型的实测性能与预期性能进行比较。

##### 测量不确定度

[measurementUncertainty.data.ts](../../../content/engineering/data/skills/engineeringDesign/testingAndIteration/skills/measurementUncertainty.data.ts)

**Methodological description (English):** Characterize the limits of numerical observations using resolution, calibration, repeatability and error sources, including consequences for a pass-or-fail engineering decision.

**User-friendly description (zh):** 了解测量的不确定度如何影响工程决策。

##### 规划工程试验

[planAnEngineeringTest.data.ts](../../../content/engineering/data/skills/engineeringDesign/testingAndIteration/skills/planAnEngineeringTest.data.ts)

**Methodological description (English):** Define the operating conditions, measurement and pass criterion that will evaluate a requirement.

**User-friendly description (zh):** 规划包含明确工作条件和可测量结果的测试。

##### 根据证据修改设计

[reviseADesignUsingEvidence.data.ts](../../../content/engineering/data/skills/engineeringDesign/testingAndIteration/skills/reviseADesignUsingEvidence.data.ts)

**Methodological description (English):** Change an identified feature on the basis of test results and explain the expected benefit.

**User-friendly description (zh):** 根据测试结果，说明修改设计的理由。

##### 确认用户需求得到满足

[validateUserNeeds.data.ts](../../../content/engineering/data/skills/engineeringDesign/testingAndIteration/skills/validateUserNeeds.data.ts)

**Methodological description (English):** Assess whether the finished or representative solution actually meets the real-world needs of intended users in appropriate conditions, even where formal design requirements have been met.

**User-friendly description (zh):** 了解完成的解决方案是否真正服务于预定用户。

##### 验证设计要求

[verifyDesignRequirements.data.ts](../../../content/engineering/data/skills/engineeringDesign/testingAndIteration/skills/verifyDesignRequirements.data.ts)

**Methodological description (English):** Use inspection, test, demonstration or analysis to determine whether stated technical requirements and their acceptance criteria have been met. Passing one test does not establish compliance with untested requirements.

**User-friendly description (zh):** 有条理地检查解决方案是否满足各项技术要求。

### 以人为本的工程与人体工学

Groups: 4 · Skills: 15

[humanCenteredEngineeringAndErgonomics.data.ts](../../../content/engineering/data/skills/humanCenteredEngineeringAndErgonomics/humanCenteredEngineeringAndErgonomics.data.ts)

**Methodological description (English):** Physical controls and built environments must suit real human capabilities. Engineering UX concerns shape, reach, grip, affordance, safe handling and access; digital navigation and software feedback are separate Informatics competencies.

**User-friendly description (zh):** 探索如何让实体产品和空间适合不同需求的人。

#### 无障碍环境

Skills: 3

[accessibleEnvironments.data.ts](../../../content/engineering/data/skills/humanCenteredEngineeringAndErgonomics/accessibleEnvironments/accessibleEnvironments.data.ts)

**Methodological description (English):** Inclusive infrastructure requires usable routes and fixtures as well as accessible individual devices.

**User-friendly description (zh):** 探索环境如何支持无障碍通行和使用。

##### 无障碍设施设计

[accessibleFixtureDesign.data.ts](../../../content/engineering/data/skills/humanCenteredEngineeringAndErgonomics/accessibleEnvironments/skills/accessibleFixtureDesign.data.ts)

**Methodological description (English):** Assess fixtures for reachable placement, operating force, usable grip and adequate clearance across varied physical abilities.

**User-friendly description (zh):** 规划让不同能力的人都能使用的配件和固定设施。

##### 比较包容性设计方案

[compareInclusiveDesignSolutions.data.ts](../../../content/engineering/data/skills/humanCenteredEngineeringAndErgonomics/accessibleEnvironments/skills/compareInclusiveDesignSolutions.data.ts)

**Methodological description (English):** Consider who benefits or remains excluded when choosing a physical design alternative.

**User-friendly description (zh):** 根据不同方案满足的使用需求比较无障碍解决办法。

##### 评估连续无障碍通道

[evaluateContinuousAccessRoutes.data.ts](../../../content/engineering/data/skills/humanCenteredEngineeringAndErgonomics/accessibleEnvironments/skills/evaluateContinuousAccessRoutes.data.ts)

**Methodological description (English):** Assess an existing connected journey through buildings and public spaces, testing whether doors, surfaces, widths and level changes preserve access. This is different from designing a new internal circulation layout.

**User-friendly description (zh):** 评估整条路线能否始终畅通无障碍。

#### 实体交互

Skills: 4

[physicalInteraction.data.ts](../../../content/engineering/data/skills/humanCenteredEngineeringAndErgonomics/physicalInteraction/physicalInteraction.data.ts)

**Methodological description (English):** Users should perceive the purpose of controls and the effects of their actions through appropriately designed physical cues.

**User-friendly description (zh):** 学习改进人们发现和操作实体控制装置的方式。

##### 设计防误操作控制装置

[designErrorResistantControls.data.ts](../../../content/engineering/data/skills/humanCenteredEngineeringAndErgonomics/physicalInteraction/skills/designErrorResistantControls.data.ts)

**Methodological description (English):** Reduce unintended activation or confusion through control geometry and spacing.

**User-friendly description (zh):** 设计能够减少可预见错误的控制装置。

##### 评估实体控制装置的可发现性

[evaluatePhysicalControlDiscoverability.data.ts](../../../content/engineering/data/skills/humanCenteredEngineeringAndErgonomics/physicalInteraction/skills/evaluatePhysicalControlDiscoverability.data.ts)

**Methodological description (English):** Judge whether location, form and tactile cues make a function apparent.

**User-friendly description (zh):** 判断使用者能否找到正确的实体控制装置。

##### 评估实体反馈

[evaluatePhysicalFeedback.data.ts](../../../content/engineering/data/skills/humanCenteredEngineeringAndErgonomics/physicalInteraction/skills/evaluatePhysicalFeedback.data.ts)

**Methodological description (English):** Determine whether resistance, movement or another signal communicates that an action occurred.

**User-friendly description (zh):** 检查产品能否清楚地告知控制操作产生的结果。

##### 测试实体产品的易用性

[testPhysicalProductUsability.data.ts](../../../content/engineering/data/skills/humanCenteredEngineeringAndErgonomics/physicalInteraction/skills/testPhysicalProductUsability.data.ts)

**Methodological description (English):** Observe representative tasks and record whether operation meets defined requirements.

**User-friendly description (zh):** 观察人们使用实体原型完成真实任务的过程。

#### 产品人体工学

Skills: 4

[productErgonomics.data.ts](../../../content/engineering/data/skills/humanCenteredEngineeringAndErgonomics/productErgonomics/productErgonomics.data.ts)

**Methodological description (English):** Geometry, loads and posture influence whether a device can be operated comfortably and dependably.

**User-friendly description (zh):** 探索身体尺寸、抓握方式和姿势如何影响产品的易用性。

##### 调整产品尺寸

[adaptProductDimensions.data.ts](../../../content/engineering/data/skills/humanCenteredEngineeringAndErgonomics/productErgonomics/skills/adaptProductDimensions.data.ts)

**Methodological description (English):** Choose adjustable or alternative dimensions to accommodate different users.

**User-friendly description (zh):** 调整产品大小以适应不同体型和活动。

##### 评估控制装置的可触及性

[evaluateControlReachability.data.ts](../../../content/engineering/data/skills/humanCenteredEngineeringAndErgonomics/productErgonomics/skills/evaluateControlReachability.data.ts)

**Methodological description (English):** Check access to buttons, handles or levers from intended operating positions.

**User-friendly description (zh):** 检查人们能否舒适地够到产品的控制装置。

##### 评估抓握与操作

[evaluateGripAndHandling.data.ts](../../../content/engineering/data/skills/humanCenteredEngineeringAndErgonomics/productErgonomics/skills/evaluateGripAndHandling.data.ts)

**Methodological description (English):** Relate handle dimensions, texture and operating force to controlled manipulation.

**User-friendly description (zh):** 评估物品是否容易握持和操作。

##### 评估操作姿势

[evaluateOperatingPosture.data.ts](../../../content/engineering/data/skills/humanCenteredEngineeringAndErgonomics/productErgonomics/skills/evaluateOperatingPosture.data.ts)

**Methodological description (English):** Identify strain caused by working height, repeated movement or sustained position.

**User-friendly description (zh):** 识别使任务变得不舒适或难以完成的姿势。

#### 用户需求

Skills: 4

[userNeeds.data.ts](../../../content/engineering/data/skills/humanCenteredEngineeringAndErgonomics/userNeeds/userNeeds.data.ts)

**Methodological description (English):** Design briefs must address users with differing abilities and usage contexts rather than projecting the designer's own preferences.

**User-friendly description (zh):** 学习研究产品使用者的实际活动和使用限制。

##### 识别妨碍无障碍使用的因素

[identifyAccessibilityBarriers.data.ts](../../../content/engineering/data/skills/humanCenteredEngineeringAndErgonomics/userNeeds/skills/identifyAccessibilityBarriers.data.ts)

**Methodological description (English):** Recognize force, reach, mobility, hearing, sight or dexterity obstacles introduced by a design.

**User-friendly description (zh):** 发现阻止不同能力的人使用空间的障碍。

##### 识别用户实体操作场景

[identifyPhysicalUserScenarios.data.ts](../../../content/engineering/data/skills/humanCenteredEngineeringAndErgonomics/userNeeds/skills/identifyPhysicalUserScenarios.data.ts)

**Methodological description (English):** Specify who uses an object, what task they perform and relevant conditions.

**User-friendly description (zh):** 描述人们使用产品时需要完成的实体动作。

##### 观察实体使用障碍

[observePhysicalUsabilityProblems.data.ts](../../../content/engineering/data/skills/humanCenteredEngineeringAndErgonomics/userNeeds/skills/observePhysicalUsabilityProblems.data.ts)

**Methodological description (English):** Distinguish witnessed hesitation or failed handling from assumptions about users.

**User-friendly description (zh):** 观察人们在操作实体产品时遇到的困难。

##### 将使用观察转化为需求

[translateUseObservationsIntoRequirements.data.ts](../../../content/engineering/data/skills/humanCenteredEngineeringAndErgonomics/userNeeds/skills/translateUseObservationsIntoRequirements.data.ts)

**Methodological description (English):** Define a physical success condition based on an observed problem.

**User-friendly description (zh):** 把用户行为观察转化为具体的技术要求。

### 制造与生产

Groups: 3 · Skills: 13

[manufacturingAndProduction.data.ts](../../../content/engineering/data/skills/manufacturingAndProduction/manufacturingAndProduction.data.ts)

**Methodological description (English):** Finished products require suitable forming processes, assembly, tolerances and inspection. Production engineering addresses repeatable manufacture under resource, quality and throughput limits.

**User-friendly description (zh):** 探索材料如何成形、产品如何组装，以及如何控制生产质量。

#### 装配与质量

Skills: 4

[assemblyAndQuality.data.ts](../../../content/engineering/data/skills/manufacturingAndProduction/assemblyAndQuality/assemblyAndQuality.data.ts)

**Methodological description (English):** Making components separately is insufficient when fits, order of installation or verification are wrong.

**User-friendly description (zh):** 了解装配计划和检查如何帮助生产可靠的产品。

##### 诊断制造缺陷

[diagnoseManufacturingDefects.data.ts](../../../content/engineering/data/skills/manufacturingAndProduction/assemblyAndQuality/skills/diagnoseManufacturingDefects.data.ts)

**Methodological description (English):** Relate observed nonconformity to possible processing or assembly causes.

**User-friendly description (zh):** 找出制造过程中出现缺陷的可能原因。

##### 解读制造公差

[interpretManufacturingTolerances.data.ts](../../../content/engineering/data/skills/manufacturingAndProduction/assemblyAndQuality/skills/interpretManufacturingTolerances.data.ts)

**Methodological description (English):** Read permissible dimensions and deviations from a specified manufacturing drawing, deciding whether a measured component meets its stated production limits.

**User-friendly description (zh):** 读懂制造图纸中允许的尺寸变化范围。

##### 规划装配顺序

[planAnAssemblySequence.data.ts](../../../content/engineering/data/skills/manufacturingAndProduction/assemblyAndQuality/skills/planAnAssemblySequence.data.ts)

**Methodological description (English):** Choose an order that provides access and establishes correct component alignment.

**User-friendly description (zh):** 安排装配步骤，使后续操作能够正确完成。

##### 质量检验

[qualityInspection.data.ts](../../../content/engineering/data/skills/manufacturingAndProduction/assemblyAndQuality/skills/qualityInspection.data.ts)

**Methodological description (English):** Compare specified product attributes with actual measurements instead of relying on appearance.

**User-friendly description (zh):** 根据可测量的质量要求检查制成的零件。

#### 材料成形

Skills: 5

[materialShaping.data.ts](../../../content/engineering/data/skills/manufacturingAndProduction/materialShaping/materialShaping.data.ts)

**Methodological description (English):** A manufacturing process imposes specific restrictions on geometry, material, waste and achievable accuracy.

**User-friendly description (zh):** 学习区分将原材料加工成特定形状的不同方法。

##### 增材制造

[additiveManufacturing.data.ts](../../../content/engineering/data/skills/manufacturingAndProduction/materialShaping/skills/additiveManufacturing.data.ts)

**Methodological description (English):** Describe incremental material placement or fusion used to produce three-dimensional parts.

**User-friendly description (zh):** 了解增材工艺如何逐层构建零部件。

##### 铸造工艺

[castingProcesses.data.ts](../../../content/engineering/data/skills/manufacturingAndProduction/materialShaping/skills/castingProcesses.data.ts)

**Methodological description (English):** Trace a poured molten or fluid material through filling a cavity, solidifying and removing a cast product.

**User-friendly description (zh):** 认识液态材料如何在铸型中凝固。

##### 成形工艺

[formingProcesses.data.ts](../../../content/engineering/data/skills/manufacturingAndProduction/materialShaping/skills/formingProcesses.data.ts)

**Methodological description (English):** Identify ways applied force reshapes a material without primarily removing it.

**User-friendly description (zh):** 了解材料如何通过弯曲或压制形成新形状。

##### 切削加工工艺

[machiningProcesses.data.ts](../../../content/engineering/data/skills/manufacturingAndProduction/materialShaping/skills/machiningProcesses.data.ts)

**Methodological description (English):** Describe controlled material removal by tools, such as drilling, milling or turning, and the consequences for accuracy, tool access and waste.

**User-friendly description (zh):** 认识何时通过切除材料来制造零部件。

##### 模塑工艺

[moldingProcesses.data.ts](../../../content/engineering/data/skills/manufacturingAndProduction/materialShaping/skills/moldingProcesses.data.ts)

**Methodological description (English):** Describe shaping polymer or other moldable feedstock in a cavity under suitable temperature or pressure conditions.

**User-friendly description (zh):** 探索模具如何决定制成零件的形状。

#### 生产流程

Skills: 4

[productionFlow.data.ts](../../../content/engineering/data/skills/manufacturingAndProduction/productionFlow/productionFlow.data.ts)

**Methodological description (English):** Repeated manufacture introduces throughput limits and choices between flexible batches and continuous processes.

**User-friendly description (zh):** 探索资源和零部件如何在生产过程中流转。

##### 自动化制造单元

[automatedManufacturingCells.data.ts](../../../content/engineering/data/skills/manufacturingAndProduction/productionFlow/skills/automatedManufacturingCells.data.ts)

**Methodological description (English):** Identify handling mechanisms, sensors, drives and safety boundaries in repetitive production.

**User-friendly description (zh):** 了解自动化工作站如何协调生产步骤。

##### 比较批量生产与连续生产

[compareBatchAndContinuousProduction.data.ts](../../../content/engineering/data/skills/manufacturingAndProduction/productionFlow/skills/compareBatchAndContinuousProduction.data.ts)

**Methodological description (English):** Distinguish discrete runs from ongoing manufacture and their changeover implications.

**User-friendly description (zh):** 比较分批制造产品和持续生产产品的方式。

##### 识别生产浪费

[identifyProductionWaste.data.ts](../../../content/engineering/data/skills/manufacturingAndProduction/productionFlow/skills/identifyProductionWaste.data.ts)

**Methodological description (English):** Recognize avoidable scrap, waiting, transport or rework in a manufacturing process.

**User-friendly description (zh):** 发现生产过程中浪费的材料、动作或时间。

##### 追踪生产工作流程

[traceProductionWorkflow.data.ts](../../../content/engineering/data/skills/manufacturingAndProduction/productionFlow/skills/traceProductionWorkflow.data.ts)

**Methodological description (English):** Identify stations and movement of parts from raw inputs to completed products.

**User-friendly description (zh):** 追踪产品依次经过的制造阶段。

### 材料与连接

Groups: 3 · Skills: 13

[materialsAndConnections.data.ts](../../../content/engineering/data/skills/materialsAndConnections/materialsAndConnections.data.ts)

**Methodological description (English):** Material choice and the quality of interfaces determine whether parts carry loads, resist their environment, assemble correctly and remain usable. This domain focuses on technical suitability rather than the chemistry of substances.

**User-friendly description (zh):** 学习根据产品的使用条件选择合适的材料和连接方法。

#### 连接与紧固件

Skills: 5

[jointsAndFasteners.data.ts](../../../content/engineering/data/skills/materialsAndConnections/jointsAndFasteners/jointsAndFasteners.data.ts)

**Methodological description (English):** Connections can be temporary or permanent, transmit different forces and impose different maintenance requirements.

**User-friendly description (zh):** 了解不同的接头如何固定部件并传递载荷。

##### 胶粘接头

[adhesiveJoints.data.ts](../../../content/engineering/data/skills/materialsAndConnections/jointsAndFasteners/skills/adhesiveJoints.data.ts)

**Methodological description (English):** Relate bonding, compatible surfaces and load direction to joint performance.

**User-friendly description (zh):** 探索胶粘剂如何连接适合的表面。

##### 连接方法适用性

[joiningMethodSuitability.data.ts](../../../content/engineering/data/skills/materialsAndConnections/jointsAndFasteners/skills/joiningMethodSuitability.data.ts)

**Methodological description (English):** Assess whether detachable, bonded, welded or magnetic joints can transfer loads, provide access and support maintenance. Choosing one particular screw or glue is a task variant.

**User-friendly description (zh):** 根据强度、可接近性和维护要求比较连接方法。

##### 磁力固定

[magneticFastening.data.ts](../../../content/engineering/data/skills/materialsAndConnections/jointsAndFasteners/skills/magneticFastening.data.ts)

**Methodological description (English):** Identify how magnetic attraction can retain a part and when an alternative joint is necessary.

**User-friendly description (zh):** 了解磁铁在哪些情况下能够固定组件。

##### 螺纹紧固

[threadedFastening.data.ts](../../../content/engineering/data/skills/materialsAndConnections/jointsAndFasteners/skills/threadedFastening.data.ts)

**Methodological description (English):** Describe how a bolt or screw retains connected parts and permits suitable disassembly.

**User-friendly description (zh):** 了解螺纹连接如何固定部件并允许拆卸。

##### 焊接接头

[weldedJoints.data.ts](../../../content/engineering/data/skills/materialsAndConnections/jointsAndFasteners/skills/weldedJoints.data.ts)

**Methodological description (English):** Distinguish a joined material interface from detachable mechanical fasteners.

**User-friendly description (zh):** 识别焊接与可拆卸紧固件的不同之处。

#### 材料选择

Skills: 5

[materialSelection.data.ts](../../../content/engineering/data/skills/materialsAndConnections/materialSelection/materialSelection.data.ts)

**Methodological description (English):** A component needs a combination of properties matched to its actual loading, manufacturing process and environment.

**User-friendly description (zh):** 探索材料的不同性质如何影响技术性能。

##### 复合材料的应用

[compositeMaterialApplications.data.ts](../../../content/engineering/data/skills/materialsAndConnections/materialSelection/skills/compositeMaterialApplications.data.ts)

**Methodological description (English):** Recognize how combined constituents can deliver useful directional or mixed properties.

**User-friendly description (zh):** 识别组合不同材料如何获得有用的性质。

##### 区分材料强度与刚度

[distinguishMaterialStrengthAndStiffness.data.ts](../../../content/engineering/data/skills/materialsAndConnections/materialSelection/skills/distinguishMaterialStrengthAndStiffness.data.ts)

**Methodological description (English):** Explain why resisting failure and resisting deformation are different requirements.

**User-friendly description (zh):** 区分抵抗断裂的能力和抵抗变形的能力。

##### 评估材料耐久性

[evaluateMaterialDurability.data.ts](../../../content/engineering/data/skills/materialsAndConnections/materialSelection/skills/evaluateMaterialDurability.data.ts)

**Methodological description (English):** Connect wear, corrosion, fatigue or exposure to the expected lifetime of a part.

**User-friendly description (zh):** 根据材料抵抗磨损和环境影响的能力进行比较。

##### 识别重要材料性质

[identifyRelevantMaterialProperties.data.ts](../../../content/engineering/data/skills/materialsAndConnections/materialSelection/skills/identifyRelevantMaterialProperties.data.ts)

**Methodological description (English):** Determine whether toughness, strength, stiffness, conductivity, transparency or mass matters in a specified application.

**User-friendly description (zh):** 针对具体用途选择需要关注的材料性质。

##### 评估材料适用性

[materialSuitabilityAssessment.data.ts](../../../content/engineering/data/skills/materialsAndConnections/materialSelection/skills/materialSuitabilityAssessment.data.ts)

**Methodological description (English):** Evaluate which material properties and processing limitations meet the expected loads and service environment. This is a reusable material-compatibility judgment rather than an individual choice question.

**User-friendly description (zh):** 评估材料能否满足某一用途的要求。

#### 表面与配合

Skills: 3

[surfacesAndFit.data.ts](../../../content/engineering/data/skills/materialsAndConnections/surfacesAndFit/surfacesAndFit.data.ts)

**Methodological description (English):** Small variations at contacting surfaces affect motion, grip, sealing, protection and assembly.

**User-friendly description (zh):** 了解表面性质和微小间隙如何影响机械连接。

##### 评估接触面摩擦

[evaluateFrictionAtAnInterface.data.ts](../../../content/engineering/data/skills/materialsAndConnections/surfacesAndFit/skills/evaluateFrictionAtAnInterface.data.ts)

**Methodological description (English):** Distinguish contacts that need reliable grip from those requiring easy sliding.

**User-friendly description (zh):** 识别哪些地方需要摩擦提供抓力，哪些地方需要降低摩擦。

##### 配合与间隙

[fitsAndClearances.data.ts](../../../content/engineering/data/skills/materialsAndConnections/surfacesAndFit/skills/fitsAndClearances.data.ts)

**Methodological description (English):** Relate permissible gaps and interference between mating parts to sliding, rotation, retention or sealing. This is distinct from decoding a production drawing's dimensional specification.

**User-friendly description (zh):** 了解间隙与配合如何影响运动部件和密封部件。

##### 表面防护处理

[protectiveSurfaceTreatments.data.ts](../../../content/engineering/data/skills/materialsAndConnections/surfacesAndFit/skills/protectiveSurfaceTreatments.data.ts)

**Methodological description (English):** Relate coatings or treatments to corrosion, wear, wetting or other surface properties.

**User-friendly description (zh):** 选择能防止表面磨损或腐蚀的涂层。

### 机构与机械

Groups: 4 · Skills: 18

[mechanismsAndMachines.data.ts](../../../content/engineering/data/skills/mechanismsAndMachines/mechanismsAndMachines.data.ts)

**Methodological description (English):** Moving assemblies redirect or transmit force, torque and motion to achieve tasks. This domain investigates how real mechanical arrangements work, not the underlying laws of mechanics as an independent science.

**User-friendly description (zh):** 探索机械部件如何传递力并改变运动形式。

#### 运动导向与固定

Skills: 5

[guidanceAndRetention.data.ts](../../../content/engineering/data/skills/mechanismsAndMachines/guidanceAndRetention/guidanceAndRetention.data.ts)

**Methodological description (English):** Motion must be supported and limited while interfaces are protected from damaging friction or unintended release.

**User-friendly description (zh):** 了解哪些部件支撑运动并防止意外松脱。

##### 轴承

[bearings.data.ts](../../../content/engineering/data/skills/mechanismsAndMachines/guidanceAndRetention/skills/bearings.data.ts)

**Methodological description (English):** Identify how supported shafts can rotate relative to a machine housing.

**User-friendly description (zh):** 识别轴承如何支撑旋转轴。

##### 制动机构

[brakingMechanisms.data.ts](../../../content/engineering/data/skills/mechanismsAndMachines/guidanceAndRetention/skills/brakingMechanisms.data.ts)

**Methodological description (English):** Trace how contact forces or another braking device oppose a rotating component and transfer motion energy into heat or another form.

**User-friendly description (zh):** 追踪制动装置如何减慢旋转部件的速度。

##### 闩锁

[latches.data.ts](../../../content/engineering/data/skills/mechanismsAndMachines/guidanceAndRetention/skills/latches.data.ts)

**Methodological description (English):** Describe how a catch retains a door or moving part in its closed position and permits intentional release.

**User-friendly description (zh):** 了解闩锁如何保持关闭并允许有意打开。

##### 锁具

[locks.data.ts](../../../content/engineering/data/skills/mechanismsAndMachines/guidanceAndRetention/skills/locks.data.ts)

**Methodological description (English):** Identify how a key, code or other authorization mechanism restricts the operation of a secured closure.

**User-friendly description (zh):** 识别锁如何限制未经授权的人操作门或装置。

##### 润滑

[lubrication.data.ts](../../../content/engineering/data/skills/mechanismsAndMachines/guidanceAndRetention/skills/lubrication.data.ts)

**Methodological description (English):** Relate a lubricant to reduced wear and heating at a moving interface.

**User-friendly description (zh):** 解释润滑为何能减少摩擦和磨损。

#### 综合机械

Skills: 3

[integratedMachines.data.ts](../../../content/engineering/data/skills/mechanismsAndMachines/integratedMachines/integratedMachines.data.ts)

**Methodological description (English):** Machines combine multiple components in a working sequence, so their behavior cannot be inferred from a single named part.

**User-friendly description (zh):** 探索多种机械机构如何协同工作。

##### 诊断传动故障

[diagnoseTransmissionFaults.data.ts](../../../content/engineering/data/skills/mechanismsAndMachines/integratedMachines/skills/diagnoseTransmissionFaults.data.ts)

**Methodological description (English):** Connect slipping, jamming or unexpected movement to plausible defects.

**User-friendly description (zh):** 诊断打滑、卡滞及其他传动问题。

##### 选择合适的运动机构

[motionMechanismSuitability.data.ts](../../../content/engineering/data/skills/mechanismsAndMachines/integratedMachines/skills/motionMechanismSuitability.data.ts)

**Methodological description (English):** Relate the output direction, movement pattern, displacement and force needs to feasible mechanisms and their operating limits.

**User-friendly description (zh):** 选择能满足所需运动方向和方式的机构。

##### 追踪机械动力传递

[traceMechanicalPowerTransmission.data.ts](../../../content/engineering/data/skills/mechanismsAndMachines/integratedMachines/skills/traceMechanicalPowerTransmission.data.ts)

**Methodological description (English):** Follow useful motion and energy from a prime mover to the working component.

**User-friendly description (zh):** 追踪从驱动装置到机器工作部件的能量和运动。

#### 运动转换

Skills: 4

[motionConversion.data.ts](../../../content/engineering/data/skills/mechanismsAndMachines/motionConversion/motionConversion.data.ts)

**Methodological description (English):** Mechanical linkages and profiles transform rotation, translation or oscillation into required movement patterns.

**User-friendly description (zh):** 探索运动部件如何把一种运动转化为另一种。

##### 铰接连杆机构

[articulatedLinkages.data.ts](../../../content/engineering/data/skills/mechanismsAndMachines/motionConversion/skills/articulatedLinkages.data.ts)

**Methodological description (English):** Trace how connected rigid bars and pivots restrict the trajectory of an output in tools or articulated machines.

**User-friendly description (zh):** 追踪由铰链连接的杆件如何引导机器运动。

##### 凸轮机构

[camMechanisms.data.ts](../../../content/engineering/data/skills/mechanismsAndMachines/motionConversion/skills/camMechanisms.data.ts)

**Methodological description (English):** Connect a shaped rotating profile with the timed displacement of a follower.

**User-friendly description (zh):** 了解旋转的凸轮如何推动从动件。

##### 曲柄滑块机构

[crankSliderMechanisms.data.ts](../../../content/engineering/data/skills/mechanismsAndMachines/motionConversion/skills/crankSliderMechanisms.data.ts)

**Methodological description (English):** Trace conversion between rotary and reciprocating motion in a piston machine.

**User-friendly description (zh):** 解释曲柄和滑块如何连接旋转运动与往复运动。

##### 螺旋机构

[screwMechanisms.data.ts](../../../content/engineering/data/skills/mechanismsAndMachines/motionConversion/skills/screwMechanisms.data.ts)

**Methodological description (English):** Describe how the pitch and mating threads of a screw convert rotation into controlled axial displacement or a clamping force.

**User-friendly description (zh):** 识别螺杆如何把旋转转化为直线运动或压力。

#### 传动机构

Skills: 6

[transmissions.data.ts](../../../content/engineering/data/skills/mechanismsAndMachines/transmissions/transmissions.data.ts)

**Methodological description (English):** Shafts, flexible elements and meshing components connect input motion to a useful output with potentially different speed, force and direction.

**User-friendly description (zh):** 探索轴、齿轮和柔性传动装置如何在部件之间传递运动。

##### 带传动

[beltDrives.data.ts](../../../content/engineering/data/skills/mechanismsAndMachines/transmissions/skills/beltDrives.data.ts)

**Methodological description (English):** Trace how tensioned flexible belts transfer motion between pulleys through friction or toothed engagement, including likely causes of slip.

**User-friendly description (zh):** 了解皮带张力和带轮表面如何传递旋转。

##### 链传动

[chainDrives.data.ts](../../../content/engineering/data/skills/mechanismsAndMachines/transmissions/skills/chainDrives.data.ts)

**Methodological description (English):** Describe positive engagement between chain links and sprockets, including the need for alignment, tension and lubrication.

**User-friendly description (zh):** 探索链条与链轮如何在不发生普通打滑的情况下传递运动。

##### 计算齿轮传动比

[determineAGearRatio.data.ts](../../../content/engineering/data/skills/mechanismsAndMachines/transmissions/skills/determineAGearRatio.data.ts)

**Methodological description (English):** Calculate relative rotation or speed using the teeth of a gear pair.

**User-friendly description (zh):** 计算齿数如何决定齿轮的转速比。

##### 齿轮传动

[gearTransmission.data.ts](../../../content/engineering/data/skills/mechanismsAndMachines/transmissions/skills/gearTransmission.data.ts)

**Methodological description (English):** Trace rotational transfer between meshing gears and the effect of tooth counts.

**User-friendly description (zh):** 追踪相互啮合的齿轮之间如何传递旋转。

##### 杠杆机构

[leverMechanisms.data.ts](../../../content/engineering/data/skills/mechanismsAndMachines/transmissions/skills/leverMechanisms.data.ts)

**Methodological description (English):** Identify pivot, input and output arrangement in a lever-driven machine.

**User-friendly description (zh):** 识别杠杆机构中的支点、输入力和输出力。

##### 滑轮系统

[pulleySystems.data.ts](../../../content/engineering/data/skills/mechanismsAndMachines/transmissions/skills/pulleySystems.data.ts)

**Methodological description (English):** Trace rope paths, supporting segments and moving loads in lifting arrangements.

**User-friendly description (zh):** 沿着滑轮装置的绳索路径和承重绳段追踪受力情况。

### 过程与农业工程

Groups: 3 · Skills: 13

[processAndAgriculturalEngineering.data.ts](../../../content/engineering/data/skills/processAndAgriculturalEngineering/processAndAgriculturalEngineering.data.ts)

**Methodological description (English):** Some engineered systems transform flowing materials rather than assembling separate mechanical parts. Their design coordinates equipment, transfer rates, process conditions and product quality; agricultural and food technologies adapt these principles to living materials and variable field environments.

**User-friendly description (zh):** 探索改变材料的系统，以及支持食品和农业生产的工程系统。

#### 食品与农业技术

Skills: 4

[foodAndAgriculturalTechnology.data.ts](../../../content/engineering/data/skills/processAndAgriculturalEngineering/foodAndAgriculturalTechnology/foodAndAgriculturalTechnology.data.ts)

**Methodological description (English):** Food and field equipment must handle biological materials with variable properties and constraints involving spoilage, hygiene, water use and environmental conditions.

**User-friendly description (zh):** 探索用于储存食品和支持现代农业的机器。

##### 发酵生产设备

[fermentationProductionEquipment.data.ts](../../../content/engineering/data/skills/processAndAgriculturalEngineering/foodAndAgriculturalTechnology/skills/fermentationProductionEquipment.data.ts)

**Methodological description (English):** Trace the functions of a vessel, controlled conditions and material handling in an engineered biological production process.

**User-friendly description (zh):** 了解发酵生产中使用的受控设备。

##### 食品保藏设备

[foodPreservationEquipment.data.ts](../../../content/engineering/data/skills/processAndAgriculturalEngineering/foodAndAgriculturalTechnology/skills/foodPreservationEquipment.data.ts)

**Methodological description (English):** Identify how refrigeration, dehydration, heating or sealed packaging apparatus supports a specified preservation process.

**User-friendly description (zh):** 认识有助于保持食品安全并减缓变质的设备。

##### 灌溉工程

[irrigationEngineering.data.ts](../../../content/engineering/data/skills/processAndAgriculturalEngineering/foodAndAgriculturalTechnology/skills/irrigationEngineering.data.ts)

**Methodological description (English):** Relate water sources, delivery methods and flow control to plant water needs and resource constraints.

**User-friendly description (zh):** 追踪工程系统如何向农作物输送水。

##### 精准农业设备

[precisionAgriculturalEquipment.data.ts](../../../content/engineering/data/skills/processAndAgriculturalEngineering/foodAndAgriculturalTechnology/skills/precisionAgriculturalEquipment.data.ts)

**Methodological description (English):** Identify the sensing, positioning and variable-delivery functions of machines that adapt work to field conditions.

**User-friendly description (zh):** 探索根据田间测量条件调整作业的农业机械。

#### 工业工艺设备

Skills: 4

[industrialProcessEquipment.data.ts](../../../content/engineering/data/skills/processAndAgriculturalEngineering/industrialProcessEquipment/industrialProcessEquipment.data.ts)

**Methodological description (English):** Process apparatus can separate mixtures, support controlled chemical transformations or maintain thermal conditions while containing potentially hazardous materials.

**User-friendly description (zh):** 了解用于分离物质、进行反应、加热及安全容纳工艺物料的设备。

##### 化学反应器系统

[chemicalReactorSystems.data.ts](../../../content/engineering/data/skills/processAndAgriculturalEngineering/industrialProcessEquipment/skills/chemicalReactorSystems.data.ts)

**Methodological description (English):** Identify containment, feed, mixing, heat control and product removal functions in a vessel designed for a controlled transformation.

**User-friendly description (zh):** 识别化学反应容器受到控制的各项功能。

##### 工业分离设备

[industrialSeparationEquipment.data.ts](../../../content/engineering/data/skills/processAndAgriculturalEngineering/industrialProcessEquipment/skills/industrialSeparationEquipment.data.ts)

**Methodological description (English):** Distinguish practical roles for filtration, sedimentation, distillation or membrane systems based on which property enables separation.

**User-friendly description (zh):** 认识根据物理性质分离物质的设备。

##### 工艺物料密闭控制

[processContainment.data.ts](../../../content/engineering/data/skills/processAndAgriculturalEngineering/industrialProcessEquipment/skills/processContainment.data.ts)

**Methodological description (English):** Relate sealed vessels, piping, ventilation and pressure controls to keeping working materials within suitable operating boundaries.

**User-friendly description (zh):** 解释为什么容器和密封装置必须防止物料失控泄漏。

##### 工艺加热系统

[processHeatingSystems.data.ts](../../../content/engineering/data/skills/processAndAgriculturalEngineering/industrialProcessEquipment/skills/processHeatingSystems.data.ts)

**Methodological description (English):** Trace heat delivery and temperature regulation through industrial apparatus rather than treating a heater as an isolated element.

**User-friendly description (zh):** 追踪加热设备如何向工艺物流传递能量。

#### 工艺流程架构

Skills: 5

[processArchitecture.data.ts](../../../content/engineering/data/skills/processAndAgriculturalEngineering/processArchitecture/processArchitecture.data.ts)

**Methodological description (English):** Large production processes connect material inputs, transformations, recirculation and waste streams in a sequence where one operation constrains others.

**User-friendly description (zh):** 了解工业过程如何组织设备与物料流动。

##### 定量投料设备

[dosingEquipment.data.ts](../../../content/engineering/data/skills/processAndAgriculturalEngineering/processArchitecture/skills/dosingEquipment.data.ts)

**Methodological description (English):** Describe metering mechanisms that deliver a measured quantity or rate of material into a process stream.

**User-friendly description (zh):** 认识测量并输送受控数量物料的系统。

##### 识别工艺瓶颈

[identifyProcessBottlenecks.data.ts](../../../content/engineering/data/skills/processAndAgriculturalEngineering/processArchitecture/skills/identifyProcessBottlenecks.data.ts)

**Methodological description (English):** Recognize how limited capacity or interruptions at one processing stage affect the output of a connected plant.

**User-friendly description (zh):** 找出限制整个系统产出的工艺阶段。

##### 工业混合设备

[industrialMixingEquipment.data.ts](../../../content/engineering/data/skills/processAndAgriculturalEngineering/processArchitecture/skills/industrialMixingEquipment.data.ts)

**Methodological description (English):** Identify agitation or flow arrangements used to distribute multiple ingredients to a required degree of uniformity.

**User-friendly description (zh):** 了解工业设备如何混合不同物质。

##### 解读工艺流程图

[interpretAProcessFlowDiagram.data.ts](../../../content/engineering/data/skills/processAndAgriculturalEngineering/processArchitecture/skills/interpretAProcessFlowDiagram.data.ts)

**Methodological description (English):** Trace named material streams and equipment blocks to determine the order and purpose of operations in a production process.

**User-friendly description (zh):** 读懂展示生产设备连接关系的流程图。

##### 追踪物料平衡

[traceMaterialBalances.data.ts](../../../content/engineering/data/skills/processAndAgriculturalEngineering/processArchitecture/skills/traceMaterialBalances.data.ts)

**Methodological description (English):** Relate input, accumulation, product and waste flows across a specified process boundary without confusing mass conservation with constant volume.

**User-friendly description (zh):** 追踪物料如何进入、离开并积聚在加工系统中。

### 安全、可持续性与责任

Groups: 3 · Skills: 14

[safetySustainabilityAndResponsibility.data.ts](../../../content/engineering/data/skills/safetySustainabilityAndResponsibility/safetySustainabilityAndResponsibility.data.ts)

**Methodological description (English):** Engineering decisions affect people, resources and ecosystems throughout a product's service life. This domain examines foreseeable hazards, life-cycle choices and accountable technical judgment without turning an untested model into a safety certification.

**User-friendly description (zh):** 探索工程选择如何长期影响安全、资源和社会。

#### 伦理与公共影响

Skills: 5

[ethicsAndPublicEffects.data.ts](../../../content/engineering/data/skills/safetySustainabilityAndResponsibility/ethicsAndPublicEffects/ethicsAndPublicEffects.data.ts)

**Methodological description (English):** Technical solutions create benefits and burdens for users, maintainers, neighbors and communities; limitations must be disclosed.

**User-friendly description (zh):** 探索对受工程产品影响的所有人承担责任。

##### 说明设计的局限性

[communicateDesignLimitations.data.ts](../../../content/engineering/data/skills/safetySustainabilityAndResponsibility/ethicsAndPublicEffects/skills/communicateDesignLimitations.data.ts)

**Methodological description (English):** State assumptions and unverified safety claims instead of generalizing from limited tests.

**User-friendly description (zh):** 明确说明技术方案无法安全或可靠地完成什么。

##### 评估设计的环境影响

[evaluateEnvironmentalImpactsOfADesign.data.ts](../../../content/engineering/data/skills/safetySustainabilityAndResponsibility/ethicsAndPublicEffects/skills/evaluateEnvironmentalImpactsOfADesign.data.ts)

**Methodological description (English):** Consider pollution, habitat disruption and resource burdens beyond the immediate operation of the intended product.

**User-friendly description (zh):** 检查设计可能对周围环境产生的影响。

##### 评估设计的社会影响

[evaluateSocialImpactsOfADesign.data.ts](../../../content/engineering/data/skills/safetySustainabilityAndResponsibility/ethicsAndPublicEffects/skills/evaluateSocialImpactsOfADesign.data.ts)

**Methodological description (English):** Consider foreseeable distribution of access, inconvenience, displacement or other effects on people beyond direct purchasers.

**User-friendly description (zh):** 评估技术产品可能如何影响人们的生活和机会。

##### 识别受影响的利益相关者

[identifyAffectedStakeholders.data.ts](../../../content/engineering/data/skills/safetySustainabilityAndResponsibility/ethicsAndPublicEffects/skills/identifyAffectedStakeholders.data.ts)

**Methodological description (English):** Distinguish users, workers, maintainers and others exposed to a product's consequences.

**User-friendly description (zh):** 识别可能从设计中受益或受到伤害的群体。

##### 论证负责任的设计决策

[justifyResponsibleDesignDecisions.data.ts](../../../content/engineering/data/skills/safetySustainabilityAndResponsibility/ethicsAndPublicEffects/skills/justifyResponsibleDesignDecisions.data.ts)

**Methodological description (English):** Explain how safety, access, resource use and cost influenced a choice.

**User-friendly description (zh):** 运用证据、安全要求和社会后果来论证工程选择。

#### 生命周期与资源

Skills: 5

[lifeCycleAndResources.data.ts](../../../content/engineering/data/skills/safetySustainabilityAndResponsibility/lifeCycleAndResources/lifeCycleAndResources.data.ts)

**Methodological description (English):** Manufacture, operation, repair and disposal can create different impacts; improving one stage does not prove that the whole design is better.

**User-friendly description (zh):** 了解产品从制造到废弃如何消耗资源。

##### 比较环境影响的权衡

[compareEnvironmentalTradeOffs.data.ts](../../../content/engineering/data/skills/safetySustainabilityAndResponsibility/lifeCycleAndResources/skills/compareEnvironmentalTradeOffs.data.ts)

**Methodological description (English):** Judge alternatives over a stated service life rather than a single operational measure.

**User-friendly description (zh):** 比较不同技术设计带来的环境益处和损害。

##### 为材料回收设计产品

[designProductsForMaterialRecycling.data.ts](../../../content/engineering/data/skills/safetySustainabilityAndResponsibility/lifeCycleAndResources/skills/designProductsForMaterialRecycling.data.ts)

**Methodological description (English):** Relate material identification, compatibility and separable assemblies to viable recovery of constituent materials.

**User-friendly description (zh):** 规划产品使用终结时的材料回收。

##### 设计可重复使用的产品

[designProductsForReuse.data.ts](../../../content/engineering/data/skills/safetySustainabilityAndResponsibility/lifeCycleAndResources/skills/designProductsForReuse.data.ts)

**Methodological description (English):** Identify durable, cleanable or interchangeable features that make repeated service or a second use feasible.

**User-friendly description (zh):** 考虑让产品能够再次使用的设计方案。

##### 评估可维修性

[evaluateRepairability.data.ts](../../../content/engineering/data/skills/safetySustainabilityAndResponsibility/lifeCycleAndResources/skills/evaluateRepairability.data.ts)

**Methodological description (English):** Recognize the importance of accessible parts, reversible fasteners and replacement options.

**User-friendly description (zh):** 评估产品维护或维修的难易程度。

##### 追踪产品生命周期

[traceAProductLifeCycle.data.ts](../../../content/engineering/data/skills/safetySustainabilityAndResponsibility/lifeCycleAndResources/skills/traceAProductLifeCycle.data.ts)

**Methodological description (English):** Identify material, energy and waste flows from sourcing through use to end of service.

**User-friendly description (zh):** 追踪产品从原材料到使用及寿命终结的全过程。

#### 风险与防护

Skills: 4

[riskAndProtection.data.ts](../../../content/engineering/data/skills/safetySustainabilityAndResponsibility/riskAndProtection/riskAndProtection.data.ts)

**Methodological description (English):** Hazard control should be integrated into the physical design and take precedence over simple warnings.

**User-friendly description (zh):** 学习识别工程危害并降低风险。

##### 评估技术风险

[evaluateTechnicalRisk.data.ts](../../../content/engineering/data/skills/safetySustainabilityAndResponsibility/riskAndProtection/skills/evaluateTechnicalRisk.data.ts)

**Methodological description (English):** Consider plausible consequence and occurrence in an explicitly described operating situation.

**User-friendly description (zh):** 评估危害发生的可能性及其后果的严重程度。

##### 危害控制措施

[hazardControlMeasures.data.ts](../../../content/engineering/data/skills/safetySustainabilityAndResponsibility/riskAndProtection/skills/hazardControlMeasures.data.ts)

**Methodological description (English):** Distinguish elimination, guarding, isolation, automatic protection and warnings by the actual risks each addresses. Selecting a particular safeguard for an exercise is a task variant.

**User-friendly description (zh):** 选择能够减少接触危险的技术措施。

##### 识别工程危害

[identifyEngineeringHazards.data.ts](../../../content/engineering/data/skills/safetySustainabilityAndResponsibility/riskAndProtection/skills/identifyEngineeringHazards.data.ts)

**Methodological description (English):** Recognize hazardous motion, temperature, electricity, pressure or stored energy in intended use.

**User-friendly description (zh):** 识别技术设计中可能存在的物理危险。

##### 安全裕度

[safetyMargins.data.ts](../../../content/engineering/data/skills/safetySustainabilityAndResponsibility/riskAndProtection/skills/safetyMargins.data.ts)

**Methodological description (English):** Relate uncertainty in loading, materials and use conditions to extra design capacity.

**User-friendly description (zh):** 理解安全系数为何要考虑不确定性和意外载荷。

### 结构与建筑工程

Groups: 4 · Skills: 18

[structuresAndConstruction.data.ts](../../../content/engineering/data/skills/structuresAndConstruction/structuresAndConstruction.data.ts)

**Methodological description (English):** Load-bearing works transfer applied actions into suitable supports while satisfying functional, environmental and construction constraints. This domain treats the built solution rather than architectural style.

**User-friendly description (zh):** 探索建筑、桥梁和土木工程如何安全承载。

#### 建筑物

Skills: 4

[buildings.data.ts](../../../content/engineering/data/skills/structuresAndConstruction/buildings/buildings.data.ts)

**Methodological description (English):** A complete building combines its main structure with weather protection, spatial access and environmental adaptation.

**User-friendly description (zh):** 探索建筑如何结合结构支撑与环境防护。

##### 建筑围护结构

[buildingEnvelopes.data.ts](../../../content/engineering/data/skills/structuresAndConstruction/buildings/skills/buildingEnvelopes.data.ts)

**Methodological description (English):** Relate roofs, walls and openings to control of moisture, weather and heat.

**User-friendly description (zh):** 认识屋顶、墙体和窗户如何保护建筑免受天气影响。

##### 设计无障碍建筑通行路线

[designAccessibleBuildingCirculation.data.ts](../../../content/engineering/data/skills/structuresAndConstruction/buildings/skills/designAccessibleBuildingCirculation.data.ts)

**Methodological description (English):** Create a proposed arrangement of entrances, corridors, turning spaces and level transitions so people with varying mobility can move through a planned building.

**User-friendly description (zh):** 规划适合不同出行能力人群的通道和入口。

##### 识别建筑承重体系

[identifyStructuralBuildingSystems.data.ts](../../../content/engineering/data/skills/structuresAndConstruction/buildings/skills/identifyStructuralBuildingSystems.data.ts)

**Methodological description (English):** Distinguish frames or load-bearing walls from internal partitions.

**User-friendly description (zh):** 区分承重框架和墙体与普通隔墙。

##### 将建筑设计与场地相结合

[relateBuildingDesignToASite.data.ts](../../../content/engineering/data/skills/structuresAndConstruction/buildings/skills/relateBuildingDesignToASite.data.ts)

**Methodological description (English):** Identify consequences of wind, soil, terrain or climate for construction choices.

**User-friendly description (zh):** 解释场地条件如何影响建筑设计决策。

#### 土木工程项目

Skills: 4

[civilWorks.data.ts](../../../content/engineering/data/skills/structuresAndConstruction/civilWorks/civilWorks.data.ts)

**Methodological description (English):** Large built assets require sequential construction and coordination with the ground and existing infrastructure.

**User-friendly description (zh):** 探索工程师如何规划大型建设项目。

##### 桥梁施工方法

[bridgeConstructionApproaches.data.ts](../../../content/engineering/data/skills/structuresAndConstruction/civilWorks/skills/bridgeConstructionApproaches.data.ts)

**Methodological description (English):** Compare supported or staged methods for creating a span.

**User-friendly description (zh):** 比较不同的桥跨建造方法。

##### 路面结构层

[pavementLayers.data.ts](../../../content/engineering/data/skills/structuresAndConstruction/civilWorks/skills/pavementLayers.data.ts)

**Methodological description (English):** Identify why different road layers distribute vehicle loads to supporting ground.

**User-friendly description (zh):** 理解路面为何采用多层来分散交通荷载。

##### 规划施工阶段

[planConstructionStages.data.ts](../../../content/engineering/data/skills/structuresAndConstruction/civilWorks/skills/planConstructionStages.data.ts)

**Methodological description (English):** Sequence foundations, supports, structure and services with realistic dependencies.

**User-friendly description (zh):** 根据结构上的前后依赖安排施工步骤。

##### 隧道施工约束

[tunnelConstructionConstraints.data.ts](../../../content/engineering/data/skills/structuresAndConstruction/civilWorks/skills/tunnelConstructionConstraints.data.ts)

**Methodological description (English):** Relate ground stability, lining and ventilation to tunneling methods.

**User-friendly description (zh):** 识别地质条件和通风要求如何影响隧道施工。

#### 结构稳定性与测试

Skills: 4

[stabilityAndTesting.data.ts](../../../content/engineering/data/skills/structuresAndConstruction/stabilityAndTesting/stabilityAndTesting.data.ts)

**Methodological description (English):** Deformation, loss of equilibrium and local failure can all compromise a structure before every component breaks.

**User-friendly description (zh):** 了解工程师如何判断结构是否保持稳定。

##### 比较受载结构模型

[compareStructuralModelsUnderLoad.data.ts](../../../content/engineering/data/skills/structuresAndConstruction/stabilityAndTesting/skills/compareStructuralModelsUnderLoad.data.ts)

**Methodological description (English):** Use consistent supports and loading to evaluate alternatives without treating a model as a certified full-scale design.

**User-friendly description (zh):** 在一致的荷载和支撑条件下比较结构模型。

##### 评估结构稳定性

[evaluateStructuralStability.data.ts](../../../content/engineering/data/skills/structuresAndConstruction/stabilityAndTesting/skills/evaluateStructuralStability.data.ts)

**Methodological description (English):** Identify risks of overturning, sway or buckling in a given arrangement.

**User-friendly description (zh):** 识别可能造成侧摆、倾覆或屈曲的条件。

##### 解读结构变形

[interpretStructuralDeformation.data.ts](../../../content/engineering/data/skills/structuresAndConstruction/stabilityAndTesting/skills/interpretStructuralDeformation.data.ts)

**Methodological description (English):** Relate observed bending or settlement to serviceability and possible damage.

**User-friendly description (zh):** 把弯曲和沉降理解为结构变形的迹象。

##### 追踪结构荷载传递路径

[traceStructuralLoadPaths.data.ts](../../../content/engineering/data/skills/structuresAndConstruction/stabilityAndTesting/skills/traceStructuralLoadPaths.data.ts)

**Methodological description (English):** Follow weight, wind or other loads through elements and supports.

**User-friendly description (zh):** 沿相连的结构部件和支撑追踪力的传递。

#### 结构构件

Skills: 6

[structuralElements.data.ts](../../../content/engineering/data/skills/structuresAndConstruction/structuralElements/structuralElements.data.ts)

**Methodological description (English):** Characteristic forms route forces differently; a safe structure is not just a visually plausible shape.

**User-friendly description (zh):** 了解不同构件如何将力传递到地面。

##### 拱结构

[arches.data.ts](../../../content/engineering/data/skills/structuresAndConstruction/structuralElements/skills/arches.data.ts)

**Methodological description (English):** Show how a curved compression path transfers loads and may produce support thrust.

**User-friendly description (zh):** 追踪力如何沿拱传递到支座。

##### 梁

[beams.data.ts](../../../content/engineering/data/skills/structuresAndConstruction/structuralElements/skills/beams.data.ts)

**Methodological description (English):** Trace bending and load transfer from a span to its supports.

**User-friendly description (zh):** 解释梁如何在支座之间承受荷载。

##### 柱

[columns.data.ts](../../../content/engineering/data/skills/structuresAndConstruction/structuralElements/skills/columns.data.ts)

**Methodological description (English):** Recognize how primarily compression-loaded vertical members support loads and why slender members may become unstable.

**User-friendly description (zh):** 认识柱如何承受压力以及为什么会屈曲。

##### 地基与基础

[foundations.data.ts](../../../content/engineering/data/skills/structuresAndConstruction/structuralElements/skills/foundations.data.ts)

**Methodological description (English):** Connect bearing and settlement conditions with transferring structural loads to ground.

**User-friendly description (zh):** 解释基础如何将建筑重量传递到土壤。

##### 结构支撑

[structuralBracing.data.ts](../../../content/engineering/data/skills/structuresAndConstruction/structuralElements/skills/structuralBracing.data.ts)

**Methodological description (English):** Trace how diagonal members or other lateral systems prevent unwanted sway and redistribute horizontal actions.

**User-friendly description (zh):** 理解斜撑如何防止结构不必要的横向移动。

##### 桁架

[trusses.data.ts](../../../content/engineering/data/skills/structuresAndConstruction/structuralElements/skills/trusses.data.ts)

**Methodological description (English):** Relate connected triangular members to a framed load path.

**User-friendly description (zh):** 认识三角形杆系如何承受桁架中的荷载。

### 系统工程

Groups: 3 · Skills: 13

[systemsEngineering.data.ts](../../../content/engineering/data/skills/systemsEngineering/systemsEngineering.data.ts)

**Methodological description (English):** An engineered system is defined by coordinated functions and exchanges, not just a collection of parts. This domain addresses architecture, interfaces, dependencies, reliability and the consequences of faults.

**User-friendly description (zh):** 探索复杂系统中各组件如何协作，以及出现故障时会怎样。

#### 功能架构

Skills: 5

[functionalArchitecture.data.ts](../../../content/engineering/data/skills/systemsEngineering/functionalArchitecture/functionalArchitecture.data.ts)

**Methodological description (English):** The same overall service may be implemented by different assemblies; the function and system boundary must be distinguished from component names.

**User-friendly description (zh):** 学习如何通过功能和边界定义工程系统。

##### 识别系统功能

[identifyASystemFunction.data.ts](../../../content/engineering/data/skills/systemsEngineering/functionalArchitecture/skills/identifyASystemFunction.data.ts)

**Methodological description (English):** State the useful transformation or service that a machine or infrastructure delivers.

**User-friendly description (zh):** 确定工程系统执行的有用任务。

##### 识别系统边界

[identifySystemBoundaries.data.ts](../../../content/engineering/data/skills/systemsEngineering/functionalArchitecture/skills/identifySystemBoundaries.data.ts)

**Methodological description (English):** Separate the engineered assembly from its users, surroundings and connected external services.

**User-friendly description (zh):** 区分正在研究的系统及其环境和用户。

##### 子系统功能

[subsystemFunctions.data.ts](../../../content/engineering/data/skills/systemsEngineering/functionalArchitecture/skills/subsystemFunctions.data.ts)

**Methodological description (English):** Identify why each major assembly is necessary to the overall service.

**User-friendly description (zh):** 解释各主要子系统在整体功能中的作用。

##### 追踪操作顺序

[traceAnOperatingSequence.data.ts](../../../content/engineering/data/skills/systemsEngineering/functionalArchitecture/skills/traceAnOperatingSequence.data.ts)

**Methodological description (English):** Describe the causal order of events through startup, normal operation or shutdown.

**User-friendly description (zh):** 跟随系统启动、使用和停止时发生的各个步骤。

##### 追踪输入与输出

[traceInputsAndOutputs.data.ts](../../../content/engineering/data/skills/systemsEngineering/functionalArchitecture/skills/traceInputsAndOutputs.data.ts)

**Methodological description (English):** Follow energy, materials or signals entering and leaving an operating system, including losses or by-products.

**User-friendly description (zh):** 追踪进入和离开系统的物质、能量或信息。

#### 接口与相互依赖

Skills: 4

[interfacesAndInterdependencies.data.ts](../../../content/engineering/data/skills/systemsEngineering/interfacesAndInterdependencies/interfacesAndInterdependencies.data.ts)

**Methodological description (English):** Local decisions affect neighboring components through mechanical, electrical, fluid and information connections.

**User-friendly description (zh):** 探索相互连接的部件如何彼此依赖。

##### 分析子系统依赖关系

[analyzeSubsystemDependencies.data.ts](../../../content/engineering/data/skills/systemsEngineering/interfacesAndInterdependencies/skills/analyzeSubsystemDependencies.data.ts)

**Methodological description (English):** Show how a limitation or interruption in one part influences another part's operation.

**User-friendly description (zh):** 解释一个子系统的问题如何影响其他部分。

##### 评估系统层面的取舍

[evaluateSystemLevelCompromises.data.ts](../../../content/engineering/data/skills/systemsEngineering/interfacesAndInterdependencies/skills/evaluateSystemLevelCompromises.data.ts)

**Methodological description (English):** Explain why optimizing one part may worsen total cost, complexity, efficiency or reliability.

**User-friendly description (zh):** 理解为何改进一个组件可能使整个系统表现变差。

##### 识别组件接口

[identifyComponentInterfaces.data.ts](../../../content/engineering/data/skills/systemsEngineering/interfacesAndInterdependencies/skills/identifyComponentInterfaces.data.ts)

**Methodological description (English):** Determine what must physically cross a boundary between connected assemblies.

**User-friendly description (zh):** 识别部件之间机械、电气或其他连接的位置。

##### 预测组件更改的影响

[predictTheEffectOfComponentChanges.data.ts](../../../content/engineering/data/skills/systemsEngineering/interfacesAndInterdependencies/skills/predictTheEffectOfComponentChanges.data.ts)

**Methodological description (English):** Trace how altered dimensions, rates or capacities affect connected system functions.

**User-friendly description (zh):** 预测组件容量或尺寸的变化如何影响其他组件。

#### 可靠性与维护

Skills: 4

[reliabilityAndMaintenance.data.ts](../../../content/engineering/data/skills/systemsEngineering/reliabilityAndMaintenance/reliabilityAndMaintenance.data.ts)

**Methodological description (English):** Operating systems face wear and faults, so diagnosis and continued service require explicit understanding of possible failure paths.

**User-friendly description (zh):** 了解工程师如何处理故障并维持可靠运行。

##### 区分部件故障与系统故障

[distinguishComponentAndSystemFailures.data.ts](../../../content/engineering/data/skills/systemsEngineering/reliabilityAndMaintenance/skills/distinguishComponentAndSystemFailures.data.ts)

**Methodological description (English):** Explain why the loss of a part may or may not disable the overall function.

**User-friendly description (zh):** 区分单个部件失效与整个系统失效。

##### 规划预防性维护

[planPreventiveMaintenance.data.ts](../../../content/engineering/data/skills/systemsEngineering/reliabilityAndMaintenance/skills/planPreventiveMaintenance.data.ts)

**Methodological description (English):** Identify inspections, cleaning, adjustments or replacements justified by wear and operating conditions.

**User-friendly description (zh):** 规划检查和维护，以减少可预见的故障。

##### 系统冗余

[systemRedundancy.data.ts](../../../content/engineering/data/skills/systemsEngineering/reliabilityAndMaintenance/skills/systemRedundancy.data.ts)

**Methodological description (English):** Recognize how independent backup paths can preserve a critical function during a component failure.

**User-friendly description (zh):** 了解备用路径如何使重要功能继续运行。

##### 追踪技术故障

[traceTechnicalFaults.data.ts](../../../content/engineering/data/skills/systemsEngineering/reliabilityAndMaintenance/skills/traceTechnicalFaults.data.ts)

**Methodological description (English):** Use symptoms and dependencies to locate a likely malfunction in a connected system.

**User-friendly description (zh):** 沿着相互依赖的部件追踪设备故障症状。

### 热工与流体设备

Groups: 3 · Skills: 11

[thermalAndFluidDevices.data.ts](../../../content/engineering/data/skills/thermalAndFluidDevices/thermalAndFluidDevices.data.ts)

**Methodological description (English):** Practical equipment moves heat, air and other fluids through controlled component chains. Here the object of study is the apparatus and its operating cycle, not the isolated thermodynamic or fluid laws.

**User-friendly description (zh):** 探索控制加热、冷却和流体流动的实用机器。

#### 流体机械

Skills: 4

[fluidMachines.data.ts](../../../content/engineering/data/skills/thermalAndFluidDevices/fluidMachines/fluidMachines.data.ts)

**Methodological description (English):** Mechanical energy can produce fluid flow, pressure or driven motion using distinct devices with different operating media.

**User-friendly description (zh):** 探索泵和执行器如何推动液体与气体。

##### 气体压缩机

[gasCompressors.data.ts](../../../content/engineering/data/skills/thermalAndFluidDevices/fluidMachines/skills/gasCompressors.data.ts)

**Methodological description (English):** Distinguish increasing gas pressure from merely circulating air.

**User-friendly description (zh):** 区分压缩气体与仅仅移动空气。

##### 液压执行器

[hydraulicActuators.data.ts](../../../content/engineering/data/skills/thermalAndFluidDevices/fluidMachines/skills/hydraulicActuators.data.ts)

**Methodological description (English):** Trace pressurized liquid from a pump and valve to mechanical movement.

**User-friendly description (zh):** 理解受压液体如何驱动液压执行器。

##### 液体泵

[liquidPumps.data.ts](../../../content/engineering/data/skills/thermalAndFluidDevices/fluidMachines/skills/liquidPumps.data.ts)

**Methodological description (English):** Trace the components responsible for delivering flow or pressure to a liquid circuit.

**User-friendly description (zh):** 追踪液体泵如何产生流量和压力。

##### 气动执行器

[pneumaticActuators.data.ts](../../../content/engineering/data/skills/thermalAndFluidDevices/fluidMachines/skills/pneumaticActuators.data.ts)

**Methodological description (English):** Identify how compressed gas and control valves drive an output mechanism.

**User-friendly description (zh):** 解释压缩空气如何推动气动执行器。

#### 传热设备

Skills: 4

[heatTransferEquipment.data.ts](../../../content/engineering/data/skills/thermalAndFluidDevices/heatTransferEquipment/heatTransferEquipment.data.ts)

**Methodological description (English):** Temperature-control devices combine energy input, circulation and insulation to maintain useful thermal conditions.

**User-friendly description (zh):** 了解设备如何传递热量并维持所需温度。

##### 换热器

[heatExchangers.data.ts](../../../content/engineering/data/skills/thermalAndFluidDevices/heatTransferEquipment/skills/heatExchangers.data.ts)

**Methodological description (English):** Show how two streams transfer heat across a barrier without normally mixing.

**User-friendly description (zh):** 解释换热器中分开的流体流之间如何传热。

##### 热泵

[heatPumps.data.ts](../../../content/engineering/data/skills/thermalAndFluidDevices/heatTransferEquipment/skills/heatPumps.data.ts)

**Methodological description (English):** Identify how heat is transferred from a source to a destination using external work.

**User-friendly description (zh):** 理解热泵如何借助外部做功转移热量。

##### 制冷设备

[refrigerationEquipment.data.ts](../../../content/engineering/data/skills/thermalAndFluidDevices/heatTransferEquipment/skills/refrigerationEquipment.data.ts)

**Methodological description (English):** Trace compressor, condenser, expansion device and evaporator in a cooling cycle.

**User-friendly description (zh):** 追踪制冷循环的主要阶段。

##### 隔热适用性

[thermalInsulationSuitability.data.ts](../../../content/engineering/data/skills/thermalAndFluidDevices/heatTransferEquipment/skills/thermalInsulationSuitability.data.ts)

**Methodological description (English):** Assess how an insulating arrangement manages conductive, convective and radiative heat transfer in an intended enclosure.

**User-friendly description (zh):** 比较不同隔热布置减少不必要热传递的效果。

#### 通风与空气处理

Skills: 3

[ventilationAndAirTreatment.data.ts](../../../content/engineering/data/skills/thermalAndFluidDevices/ventilationAndAirTreatment/ventilationAndAirTreatment.data.ts)

**Methodological description (English):** Indoor climate equipment needs functional air paths, treatment components and regulation appropriate to occupied spaces.

**User-friendly description (zh):** 探索建筑如何循环和处理室内空气。

##### 空调系统

[airConditioningSystems.data.ts](../../../content/engineering/data/skills/thermalAndFluidDevices/ventilationAndAirTreatment/skills/airConditioningSystems.data.ts)

**Methodological description (English):** Identify the cooling, distribution and control functions of a practical installation.

**User-friendly description (zh):** 识别空调中的制冷、分配和控制部件。

##### 诊断流体流动受阻

[diagnoseRestrictedFluidFlow.data.ts](../../../content/engineering/data/skills/thermalAndFluidDevices/ventilationAndAirTreatment/skills/diagnoseRestrictedFluidFlow.data.ts)

**Methodological description (English):** Relate blocked filters, closed valves or narrow passages to delivery problems.

**User-friendly description (zh):** 分析过滤器、阀门或狭窄通道造成的流量不足。

##### 通风系统

[ventilationSystems.data.ts](../../../content/engineering/data/skills/thermalAndFluidDevices/ventilationAndAirTreatment/skills/ventilationSystems.data.ts)

**Methodological description (English):** Distinguish outdoor-air exchange from recirculating existing indoor air.

**User-friendly description (zh):** 区分引入新鲜空气与仅循环原有室内空气。

### 交通运输与航空航天工程

Groups: 4 · Skills: 15

[transportationAndAerospaceEngineering.data.ts](../../../content/engineering/data/skills/transportationAndAerospaceEngineering/transportationAndAerospaceEngineering.data.ts)

**Methodological description (English):** Transport machines coordinate power, support, steering, stopping and protection while moving through land, air, water or space. Each vehicle is a system with characteristic environmental and operating constraints.

**User-friendly description (zh):** 探索使车辆在陆地、水上和太空中运动的工程系统。

#### 航空器

Skills: 4

[aircraft.data.ts](../../../content/engineering/data/skills/transportationAndAerospaceEngineering/aircraft/aircraft.data.ts)

**Methodological description (English):** Aircraft incorporate propulsion, lifting surfaces, stabilization and control; different layouts solve different flight missions.

**User-friendly description (zh):** 探索支撑和控制航空器的主要结构与装置。

##### 比较飞机推进技术

[compareAircraftPropulsionTechnologies.data.ts](../../../content/engineering/data/skills/transportationAndAerospaceEngineering/aircraft/skills/compareAircraftPropulsionTechnologies.data.ts)

**Methodological description (English):** Connect propeller, jet and other arrangements to operating conditions and mission constraints.

**User-friendly description (zh):** 比较适用于不同航空器的推进系统。

##### 固定翼飞机的结构

[fixedWingAircraftArchitecture.data.ts](../../../content/engineering/data/skills/transportationAndAerospaceEngineering/aircraft/skills/fixedWingAircraftArchitecture.data.ts)

**Methodological description (English):** Identify the functions of wing, fuselage, tail, propulsion and landing gear.

**User-friendly description (zh):** 识别固定翼飞机的机翼、机体、推进与控制部件。

##### 飞机操纵面

[flightControlSurfaces.data.ts](../../../content/engineering/data/skills/transportationAndAerospaceEngineering/aircraft/skills/flightControlSurfaces.data.ts)

**Methodological description (English):** Relate ailerons, elevators and rudders to changes in orientation rather than thrust.

**User-friendly description (zh):** 解释可移动的操纵面如何改变飞机的姿态。

##### 旋翼飞行器控制

[rotorcraftControl.data.ts](../../../content/engineering/data/skills/transportationAndAerospaceEngineering/aircraft/skills/rotorcraftControl.data.ts)

**Methodological description (English):** Trace changes in rotor thrust to hovering and maneuvering.

**User-friendly description (zh):** 理解旋翼飞行器如何控制升力和方向。

#### 公路与铁路

Skills: 4

[roadAndRail.data.ts](../../../content/engineering/data/skills/transportationAndAerospaceEngineering/roadAndRail/roadAndRail.data.ts)

**Methodological description (English):** Surface vehicles depend on transmitting traction, guiding movement, supporting loads and maintaining control during stopping.

**User-friendly description (zh):** 了解使陆上车辆移动和转向的相互连接系统。

##### 转向系统

[steeringSystems.data.ts](../../../content/engineering/data/skills/transportationAndAerospaceEngineering/roadAndRail/skills/steeringSystems.data.ts)

**Methodological description (English):** Identify how wheel or axle orientation controls direction.

**User-friendly description (zh):** 解释转向部件如何改变车辆行驶方向。

##### 悬架系统

[suspensionSystems.data.ts](../../../content/engineering/data/skills/transportationAndAerospaceEngineering/roadAndRail/skills/suspensionSystems.data.ts)

**Methodological description (English):** Relate springs, dampers and supports to maintaining contact and controlling motion.

**User-friendly description (zh):** 认识悬架如何承受载荷并减缓道路不平造成的影响。

##### 车辆制动系统

[vehicleBrakingSystems.data.ts](../../../content/engineering/data/skills/transportationAndAerospaceEngineering/roadAndRail/skills/vehicleBrakingSystems.data.ts)

**Methodological description (English):** Trace control input to braking torque and recognize traction limitations.

**User-friendly description (zh):** 理解制动系统如何降低车速或使车辆停止。

##### 车辆传动系统

[vehicleDrivetrains.data.ts](../../../content/engineering/data/skills/transportationAndAerospaceEngineering/roadAndRail/skills/vehicleDrivetrains.data.ts)

**Methodological description (English):** Trace prime-mover output through transmissions to driven wheels.

**User-friendly description (zh):** 追踪传动系统如何把动力传递到车轮。

#### 航天器

Skills: 4

[spacecraft.data.ts](../../../content/engineering/data/skills/transportationAndAerospaceEngineering/spacecraft/spacecraft.data.ts)

**Methodological description (English):** Space systems must coordinate propulsion and precision orientation with energy supply, thermal protection and mission hardware.

**User-friendly description (zh):** 了解航天器如何在普通大气条件之外工作。

##### 大气再入防护

[atmosphericReEntryProtection.data.ts](../../../content/engineering/data/skills/transportationAndAerospaceEngineering/spacecraft/skills/atmosphericReEntryProtection.data.ts)

**Methodological description (English):** Connect intense heating and mechanical loading to vehicle shielding and geometry.

**User-friendly description (zh):** 认识航天器再入大气层时为何需要防热保护。

##### 识别卫星子系统

[identifySatelliteSubsystems.data.ts](../../../content/engineering/data/skills/transportationAndAerospaceEngineering/spacecraft/skills/identifySatelliteSubsystems.data.ts)

**Methodological description (English):** Distinguish payload, power, communications, thermal and attitude-control equipment.

**User-friendly description (zh):** 识别卫星的供电、通信、结构和控制子系统。

##### 火箭推进系统

[rocketPropulsionSystems.data.ts](../../../content/engineering/data/skills/transportationAndAerospaceEngineering/spacecraft/skills/rocketPropulsionSystems.data.ts)

**Methodological description (English):** Identify propellant supply, energy release and nozzle as functions of a launch engine.

**User-friendly description (zh):** 认识火箭如何通过喷出物质产生推力。

##### 航天器姿态控制

[spacecraftAttitudeControl.data.ts](../../../content/engineering/data/skills/transportationAndAerospaceEngineering/spacecraft/skills/spacecraftAttitudeControl.data.ts)

**Methodological description (English):** Relate sensors and actuators to changing orientation rather than simply changing orbit.

**User-friendly description (zh):** 理解航天器如何在太空中控制自身方向。

#### 船舶与水上交通工具

Skills: 3

[watercraft.data.ts](../../../content/engineering/data/skills/transportationAndAerospaceEngineering/watercraft/watercraft.data.ts)

**Methodological description (English):** Vessels need suitable hulls, propulsion and steering while managing stability and water resistance.

**User-friendly description (zh):** 了解船体设计与设备如何影响水上航行。

##### 船体设计选择

[hullDesignChoices.data.ts](../../../content/engineering/data/skills/transportationAndAerospaceEngineering/watercraft/skills/hullDesignChoices.data.ts)

**Methodological description (English):** Relate hull geometry and loading to displacement, stability and resistance.

**User-friendly description (zh):** 比较船体布局在稳定性和阻力方面的差异。

##### 船舶推进

[marinePropulsion.data.ts](../../../content/engineering/data/skills/transportationAndAerospaceEngineering/watercraft/skills/marinePropulsion.data.ts)

**Methodological description (English):** Trace motor or engine output to propeller or waterjet thrust.

**User-friendly description (zh):** 追踪船用发动机和螺旋桨如何推动船只前进。

##### 船舶操舵

[marineSteering.data.ts](../../../content/engineering/data/skills/transportationAndAerospaceEngineering/watercraft/skills/marineSteering.data.ts)

**Methodological description (English):** Identify how rudders, steerable drives or differential thrust change course.

**User-friendly description (zh):** 解释舵或其他装置如何控制船只航向。

### 水务与环境基础设施

Groups: 4 · Skills: 15

[waterAndEnvironmentalInfrastructure.data.ts](../../../content/engineering/data/skills/waterAndEnvironmentalInfrastructure/waterAndEnvironmentalInfrastructure.data.ts)

**Methodological description (English):** Public services depend on connected intake, treatment, storage and collection systems. This domain concerns engineered infrastructure rather than natural water circulation or public-health instruction.

**User-friendly description (zh):** 探索安全供水、排水和环境保护的工程系统。

#### 环境污染控制

Skills: 4

[environmentalControl.data.ts](../../../content/engineering/data/skills/waterAndEnvironmentalInfrastructure/environmentalControl/environmentalControl.data.ts)

**Methodological description (English):** Public environmental infrastructure also treats polluted air and solid waste. The engineering problem is selecting and integrating collection, containment and treatment equipment rather than merely recognizing that pollution exists.

**User-friendly description (zh):** 了解工程系统如何减少排放并管理废物。

##### 空气过滤设备

[airFiltrationEquipment.data.ts](../../../content/engineering/data/skills/waterAndEnvironmentalInfrastructure/environmentalControl/skills/airFiltrationEquipment.data.ts)

**Methodological description (English):** Trace air through collection, filter media and discharge components while recognizing the importance of particle size and maintenance.

**User-friendly description (zh):** 理解空气过滤器如何捕获不需要的颗粒。

##### 污染场地修复设备

[contaminatedSiteRemediationEquipment.data.ts](../../../content/engineering/data/skills/waterAndEnvironmentalInfrastructure/environmentalControl/skills/contaminatedSiteRemediationEquipment.data.ts)

**Methodological description (English):** Identify how containment, extraction or treatment systems can address a specified contaminant without assuming one method works for every site.

**User-friendly description (zh):** 理解设备如何从场地清除污染物或防止其扩散。

##### 工业排放控制

[industrialEmissionsControl.data.ts](../../../content/engineering/data/skills/waterAndEnvironmentalInfrastructure/environmentalControl/skills/industrialEmissionsControl.data.ts)

**Methodological description (English):** Identify capture and treatment stages intended to reduce selected pollutants before a process stream is released.

**User-friendly description (zh):** 识别用于控制工业生产过程排放的设备。

##### 固体废物处理系统

[solidWasteProcessingSystems.data.ts](../../../content/engineering/data/skills/waterAndEnvironmentalInfrastructure/environmentalControl/skills/solidWasteProcessingSystems.data.ts)

**Methodological description (English):** Trace collection, sorting, material recovery and residual handling through an engineered waste-management facility.

**User-friendly description (zh):** 追踪设施如何分拣、转化和处理固体废弃物。

#### 水利基础设施

Skills: 3

[hydraulicInfrastructure.data.ts](../../../content/engineering/data/skills/waterAndEnvironmentalInfrastructure/hydraulicInfrastructure/hydraulicInfrastructure.data.ts)

**Methodological description (English):** Flow and water levels can be regulated by built chambers, gates and channels that connect transport or supply routes.

**User-friendly description (zh):** 探索运河、船闸和阀门如何管理流动的水。

##### 运河船闸

[canalLocks.data.ts](../../../content/engineering/data/skills/waterAndEnvironmentalInfrastructure/hydraulicInfrastructure/skills/canalLocks.data.ts)

**Methodological description (English):** Trace chamber filling, gates and valves used to move a vessel between levels.

**User-friendly description (zh):** 解释船闸如何使船只在不同水位之间升降。

##### 比较明渠与管道

[compareChannelsAndPipes.data.ts](../../../content/engineering/data/skills/waterAndEnvironmentalInfrastructure/hydraulicInfrastructure/skills/compareChannelsAndPipes.data.ts)

**Methodological description (English):** Distinguish free-surface and enclosed conveyance when choosing a route.

**User-friendly description (zh):** 比较输水时开放水渠和封闭管道的特点。

##### 流量控制阀

[flowControlValves.data.ts](../../../content/engineering/data/skills/waterAndEnvironmentalInfrastructure/hydraulicInfrastructure/skills/flowControlValves.data.ts)

**Methodological description (English):** Identify isolation, throttling or direction-control functions in piping.

**User-friendly description (zh):** 理解阀门如何调节水和其他流体的流动。

#### 污水与排水

Skills: 4

[wastewaterAndDrainage.data.ts](../../../content/engineering/data/skills/waterAndEnvironmentalInfrastructure/wastewaterAndDrainage/wastewaterAndDrainage.data.ts)

**Methodological description (English):** Sewage, storm runoff and treated discharge have different handling requirements; networks must account for capacity and contamination.

**User-friendly description (zh):** 探索污水和雨水如何被收集及管理。

##### 防洪设施

[floodControlStructures.data.ts](../../../content/engineering/data/skills/waterAndEnvironmentalInfrastructure/wastewaterAndDrainage/skills/floodControlStructures.data.ts)

**Methodological description (English):** Relate barriers, detention or controlled diversion to flood-risk reduction and its limits.

**User-friendly description (zh):** 理解堤坝和蓄水设施如何减轻洪灾损失。

##### 雨水排放

[stormwaterDrainage.data.ts](../../../content/engineering/data/skills/waterAndEnvironmentalInfrastructure/wastewaterAndDrainage/skills/stormwaterDrainage.data.ts)

**Methodological description (English):** Trace runoff from a built surface through inlet, conveyance and discharge or retention.

**User-friendly description (zh):** 探索排水沟和渠道如何将径流引离人口聚居区。

##### 追踪污水收集流程

[traceWastewaterCollection.data.ts](../../../content/engineering/data/skills/waterAndEnvironmentalInfrastructure/wastewaterAndDrainage/skills/traceWastewaterCollection.data.ts)

**Methodological description (English):** Follow used water from connected properties to treatment facilities.

**User-friendly description (zh):** 沿污水从建筑物到收集和处理设施的路线追踪。

##### 污水处理

[wastewaterTreatment.data.ts](../../../content/engineering/data/skills/waterAndEnvironmentalInfrastructure/wastewaterAndDrainage/skills/wastewaterTreatment.data.ts)

**Methodological description (English):** Identify the different purposes of physical and biological treatment processes.

**User-friendly description (zh):** 识别用于污水处理的主要物理步骤。

#### 供水系统

Skills: 4

[waterSupply.data.ts](../../../content/engineering/data/skills/waterAndEnvironmentalInfrastructure/waterSupply/waterSupply.data.ts)

**Methodological description (English):** Safe, reliable distribution requires treatment and controlled hydraulic delivery from sources to users.

**User-friendly description (zh):** 探索水如何安全地到达家庭和其他场所。

##### 饮用水处理

[drinkingWaterTreatment.data.ts](../../../content/engineering/data/skills/waterAndEnvironmentalInfrastructure/waterSupply/skills/drinkingWaterTreatment.data.ts)

**Methodological description (English):** Distinguish filtration, particle separation and disinfection as different barriers.

**User-friendly description (zh):** 识别使饮用水适合使用的主要处理步骤。

##### 识别配水管网漏水

[identifyDistributionLeakage.data.ts](../../../content/engineering/data/skills/waterAndEnvironmentalInfrastructure/waterSupply/skills/identifyDistributionLeakage.data.ts)

**Methodological description (English):** Interpret pressure or flow irregularities as possible evidence of lost water.

**User-friendly description (zh):** 查找供水设施中漏水的迹象。

##### 供水压力管理

[pressureManagement.data.ts](../../../content/engineering/data/skills/waterAndEnvironmentalInfrastructure/waterSupply/skills/pressureManagement.data.ts)

**Methodological description (English):** Relate tanks, pumps and control devices to service pressure and continuity.

**User-friendly description (zh):** 理解供水系统如何保持适当水压。

##### 追踪饮用水供应流程

[traceDrinkingWaterSupply.data.ts](../../../content/engineering/data/skills/waterAndEnvironmentalInfrastructure/waterSupply/skills/traceDrinkingWaterSupply.data.ts)

**Methodological description (English):** Follow a source through treatment, storage and distribution to a point of use.

**User-friendly description (zh):** 追踪水从水源经处理设施到供水管网的路径。


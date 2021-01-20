# Regex to parse the copied and pasted text from LA: [P|S][\d]+(?:[.][\d]+)?(?:[(][i]+[)])?
to_parse = """
P1
P2
P3
S1.1
S1.2
S1.3
S1.4
S1.5
P4
S2.1
S2.2
S2.3
S2.4
S2.5
S2.6
S2.7
S2.8
S2.9
S2.10
S3.1
S3.2
S3.3
S3.4
S3.5
S3.6
S3.7
S3.8
S3.9
S3.10
S3.11
S3.12
S3.13
S3.14
S4.1
S4.2
S4.3
S5.1
S5.2
S6.1
S6.2
S6.3
S6.4
S6.5
S6.6
S6.7
S6.8
P5
P6
P7
P8
P9
S7.1
S7.2
S7.3
P10
P11
S8.1
S8.2
S8.3
S8.4
S8.5
S9.1
S9.2
S9.3
S9.4
S9.5
S9.6
P12
P13
S10.1
S10.2
S10.3
S10.4
S10.5
S10.6
P14
"""

perfs = []
unparsedSkills = []
for point in to_parse.split("\n"):
    if point == "":
        continue

    if (point[0].upper() == "P"):
        perfs.append(point)
    else:
        unparsedSkills.append(point)

print("<PerformanceRequirements>")
for perf in perfs:
    print(f"\t<Performance Code=\"{perf}\" />")
print("</PerformanceRequirements>")

skills = {}

for unparsedSkill in unparsedSkills:
    skillRoot = str.split(unparsedSkill, ".")
    if (not skillRoot[0] in skills.keys()):
        skills[skillRoot[0]] = []

    skills[skillRoot[0]].append(unparsedSkill)

print("<SkillRequirements>")
for key,var in skills.items():
    print(f"\t<Skill Code=\"{key}\">")

    print("\t\t<Criteria NumberToMeet=\"\" Unique=\"\" />")

    print("\t\t<Points>")

    for skillPoint in var:
        print(f"\t\t\t<SkillPoint Code=\"{skillPoint}\" />")

    print("\t\t</Points>")

    print("\t</Skill>")
print("</SkillRequirements>")
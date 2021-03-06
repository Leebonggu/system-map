# SYSTEM MAP

## 필수적 요소

1. 변수 - 크기?
2. 방향성(+ / -)
3. 연결 (화살표)

---- 

4. 강화 / 밸런스
5. 강화 / 밸런스 흐름에 따른 변수의 크기 변화

https://www.npmjs.com/package/vis-react

1. 데이터 -> 정리해서 -> 불러?
2. 데어티 -> 불러서 -> 정리?
3. 그 수치를 어떻게 해야하나.
4. 원을 클릭했을 때, 선택사항이 나와야함.
5. 흐음

----

## data sample1

### nodes

nodes: Array(15)
0:
color: undefined
from: "KTBBFC50"
group: "Biology"
id: "KTBBFC50"
label: "Heart"
seo_subject_name: "Biology"
source: "Heart"
target: ""
to: ""
type: "Foundation Concept"

1:
color: undefined
concept_url: "study/cardiac-cycle-concept?entity_code=KTBBFC05"
from: "KTBBFC50"
group: "Biology"
id: "KTBBFC05"
label: "Cardiac Cycle"
seo_subject_name: "Biology"
source: "Heart"
target: "Cardiac Cycle"
to: "KTBBFC05"
type: "Concepts"

### edges

0:
arrows: "to"
from: "KTBBFC50"
id: "71c21db0-2942-4fc2-985b-b91f44dab31b"
to: "KTBBFC05"

1:
arrows: "to"
from: "KTBBFC50"
id: "e0d6ae92-0a3d-488f-96f4-03a93f677057"
to: "KTBBFC15"

## data sample2

[
  {
    "content_code": "KTBBFC50",
    "relation": {
      "root_kt_node": [
        {
          "source": "Heart",
          "target": "",
          "from": "KTBBFC50",
          "to": "",
          "label": "Definition",
          "seo_subject_name": "Biology",
          "type": "Foundation Concept",
          "id": 0
        }
      ],
      "leading_to_links": [
        {
          "source": "Heart",
          "target": "Cardiac Cycle",
          "from": "KTBBFC50",
          "to": "KTBBFC05",
          "label": "Definition",
          "type": "Concepts",
          "id": 3569,
          "seo_subject_name": "Biology",
          "concept_url": "study/cardiac-cycle-concept?entity_code=KTBBFC05"
        },
        {
          "source": "Heart",
          "target": "Heart Beat",
          "from": "KTBBFC50",
          "to": "KTBBFC15",
          "label": "Definition",
          "type": "Foundation Concept",
          "id": 3579,
          "seo_subject_name": "Biology",
          "concept_url": "study/heart-beat-concept?entity_code=KTBBFC15"
        },
        {
          "source": "Heart",
          "target": "Pulse Rate",
          "from": "KTBBFC50",
          "to": "KTBBFC52",
          "label": "Definition",
          "type": "Foundation Concept",
          "id": 5848,
          "seo_subject_name": "Biology",
          "concept_url": "study/pulse-rate-concept?entity_code=KTBBFC52"
        },
        {
          "source": "Heart",
          "target": "Heart Rate",
          "from": "KTBBFC50",
          "to": "KTBBFC53",
          "label": "Definition",
          "type": "Concepts",
          "id": 5849,
          "seo_subject_name": "Biology",
          "concept_url": "study/heart-rate-concept?entity_code=KTBBFC53"
        },
        {
          "source": "Heart",
          "target": "Cardiac Output",
          "from": "KTBBFC50",
          "to": "KTBBFC55",
          "label": "Definition",
          "type": "Concepts",
          "id": 5851,
          "seo_subject_name": "Biology",
          "concept_url": "study/cardiac-output-concept?entity_code=KTBBFC55"
        },
        {
          "source": "Heart",
          "target": "Structure Of Heart",
          "from": "KTBBFC50",
          "to": "KTBBFC56",
          "label": "Definition",
          "type": "Concepts",
          "id": 5852,
          "seo_subject_name": "Biology",
          "concept_url": "study/structure-of-heart-concept?entity_code=KTBBFC56"
        },
        {
          "source": "Heart",
          "target": "Electrocardiography (ECG)",
          "from": "KTBBFC50",
          "to": "KTBBFC98",
          "label": "Definition",
          "type": "Concepts",
          "id": 5894,
          "seo_subject_name": "Biology",
          "concept_url": "study/electrocardiography-ecg-concept?entity_code=KTBBFC98"
        },
        {
          "source": "Heart",
          "target": "Double Circulation",
          "from": "KTBBFC50",
          "to": "KTBBFC99",
          "label": "Diagram",
          "type": "Super Concepts",
          "id": 5895,
          "seo_subject_name": "Biology",
          "concept_url": "study/double-circulation-concept?entity_code=KTBBFC99"
        },
        {
          "source": "Heart",
          "target": "Circulatory Disorders",
          "from": "KTBBFC50",
          "to": "KTBBFC102",
          "label": "Definition",
          "type": "Concepts",
          "id": 5898,
          "seo_subject_name": "Biology",
          "concept_url": "study/circulatory-disorders-concept?entity_code=KTBBFC102"
        },
        {
          "source": "Heart",
          "target": "Regulation Of Cardiac Output",
          "from": "KTBBFC50",
          "to": "KTBBFC127",
          "label": "Definition",
          "type": "Concepts",
          "id": 5923,
          "seo_subject_name": "Biology",
          "concept_url": "study/regulation-of-cardiac-output-concept?entity_code=KTBBFC127"
        },
        {
          "source": "Heart",
          "target": "Cardiac Muscle",
          "from": "KTBBFC50",
          "to": "KTBLM92",
          "label": "Definition",
          "type": "Concepts",
          "id": 14154,
          "seo_subject_name": "Biology",
          "concept_url": "study/cardiac-muscle-concept?entity_code=KTBLM92"
        },
        {
          "source": "Heart",
          "target": "Heart Sound",
          "from": "KTBBFC50",
          "to": "KTBBFC54",
          "label": "Definition",
          "type": "Concepts",
          "id": 5850,
          "seo_subject_name": "Biology",
          "concept_url": "study/heart-sound-concept?entity_code=KTBBFC54"
        },
        {
          "source": "Heart",
          "target": "Working of Heart",
          "from": "KTBBFC50",
          "to": "KTBBFC94",
          "label": "Definition",
          "type": "Concepts",
          "id": 5890,
          "seo_subject_name": "Biology",
          "concept_url": "study/working-of-heart-concept?entity_code=KTBBFC94"
        }
      ],
      "derived_from_links": [
        {
          "source": "Component Of Blood Vascular System",
          "target": "Heart",
          "from": "KTBBFC24",
          "to": "KTBBFC50",
          "label": "Constant",
          "type": "Concepts",
          "id": 5794,
          "seo_subject_name": "Biology",
          "concept_url": "study/component-of-blood-vascular-system-concept?entity_code=KTBBFC24"
        }
      ]
    }
  }
]

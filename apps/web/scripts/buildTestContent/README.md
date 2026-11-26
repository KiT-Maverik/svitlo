# Web-owned contract content fixtures

Two test-only npm workspaces under `apps/web/fixtures/{alpha,beta}` use the same public package exports and self-contained Publish CLI as production textbooks. Alpha has localized Lessons, Courses, Skills, a Question Bank and a real lazy Scene; Beta has only metadata and media. They never import Playground and are never a production Web dependency or default. The canonical Web testing commands explicitly select `SVITLO_TEXTBOOK=web-fixture-alpha` or `SVITLO_TEXTBOOK=web-fixture-beta`.

Alpha's synthetic Course resources also publish derived localized
`data/courses/<uuid>/toc/base.json` and sparse TOC locale fragments from
the same finished fixture Course trees and known localized fixture Lesson.
They exercise the host's published-TOC path without importing authored
Playground data or adding a separate production generator.

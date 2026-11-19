# Web-owned contract content fixtures

Two test-only npm workspaces under `apps/web-fixture-*` use the same public package exports and self-contained Publish CLI as production textbooks. Alpha has localized Lessons, Courses, Skills, a Question Bank and a real lazy Scene; Beta has only metadata and media. They never import Playground and are never a production Web dependency or default. The canonical Web testing commands explicitly select `SVITLO_TEXTBOOK=web-fixture-alpha` or `SVITLO_TEXTBOOK=web-fixture-beta`.

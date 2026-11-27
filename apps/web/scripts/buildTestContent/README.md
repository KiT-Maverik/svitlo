# Web-owned contract content fixtures

Two test-only npm workspaces under `apps/web/fixtures/{alpha,beta}` use the same public package exports and self-contained Publish CLI as production textbooks. Alpha has localized Lessons, Courses, Skills, a Question Bank and a real lazy Scene; Beta has only metadata and media. They never import Playground and are never a production Web dependency or default. The canonical Web testing commands explicitly select `SVITLO_TEXTBOOK=web-fixture-alpha` or `SVITLO_TEXTBOOK=web-fixture-beta`.

Alpha's synthetic Course resources also publish derived localized
`data/courses/<uuid>/toc/base.json` and sparse TOC locale fragments from
the same finished fixture Course trees and known localized fixture Lesson.
They exercise the host's published-TOC path without importing authored
Playground data or adding a separate production generator.

Alpha also publishes a **test-only invalid-TOC Course** at UUID
`11111111-1111-4111-8111-0000000002fc`: its English Course base is valid,
but `toc/base.json` contains valid JSON with a mismatched Course UUID.
The Web preparation gate accepts its JSON syntax, while the runtime Course
identity check rejects the incorrect TOC. The Course error-boundary
browser test visits this immutable fixture. Both Playwright viewport projects
and catalog requests can run concurrently without any test writing to or
cleaning up `public/data/courses` while the Next.js host is serving it.
The deliberately invalid resource is owned by the alpha Publish manifest and
is removed by normal textbook selection cleanup.

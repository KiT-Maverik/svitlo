import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { buildTypedCourseManifest, verifyCourseDependencies } from './typed-course-direct.mjs';
import { verifyTypedCourseManifest } from './typed-course-publish.mjs';
const id = '663572e7-bd85-4516-86e2-3de07d209e03';
const sourcePath = 'content/playground/data/courses/3/' + id + '/draft.ts';
const meta = {
  operation: 'typed-course-stage5', version: 2, repo: 'KiT-Maverik/svitlo',
  number: 823, head: 'a'.repeat(40), branch: 'course/test',
  actor: 'maintainer', courseId: id, textbookRoot: 'content/playground',
  sourcePath, sourceBlobSha: 'b'.repeat(40),
  reviewCommitSha: 'a'.repeat(40), reviewVerdict: 'accepted',
};
const index = sourcePath.replace('/draft.ts','/index.ts');
const plan = {
  sourcePath, sourceBlobSha: meta.sourceBlobSha, reviewCommitSha: meta.reviewCommitSha,
  courseId: id, publishable: false, materializedPath: index,
  files: [{ path:index,kind:'typescript',content:'export const course = 1;\n' }],
  inventory: {lessons:[],episodes:[]},
  diagnostics: [], pendingEpisodes: [], pendingPlacements: [],
};
test('direct Course manifest binds reviewed source to deterministic authored output and inventories', () => {
  const manifest = buildTypedCourseManifest(meta, plan);
  assert.deepEqual(verifyCourseDependencies(meta, '', '', plan), undefined);
  assert.equal(manifest.entries[0].path,index);
  assert.equal(manifest.entries[0].sha256,createHash('sha256').update(plan.files[0].content).digest('hex'));
  assert.doesNotThrow(() => verifyTypedCourseManifest(manifest,meta));
  assert.throws(() => buildTypedCourseManifest(meta,{...plan,files:[...plan.files,...plan.files]}),/duplicate/);
  assert.throws(() => buildTypedCourseManifest(meta,{...plan,files:[{...plan.files[0],path:sourcePath}]}));
  assert.throws(() => buildTypedCourseManifest(meta,{...plan,publishable:true}));
  assert.throws(() => verifyCourseDependencies(meta,'','',{...plan,inventory:{lessons:[{placementPath:'../escape',kind:'new',type:'lesson'}],episodes:[]}}));
});

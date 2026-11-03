import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/localization';
import KnowledgeCheckpoint from '../../../KnowledgeCheckpoint/KnowledgeCheckpoint';
import type { ContentBlockResponse, RenderNested } from '../../types';

export const ContentBlock_Checkpoint = ({ response, renderNested }: {
  response: ContentBlockResponse<'checkpoint'>;
  renderNested: RenderNested;
}) => {
  const locale = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === response.locale.code)?.locale ?? 'en-US';
  return (
    <KnowledgeCheckpoint
      title={response.title}
      locale={locale}
      headingLevel={response.headingLevel}
      showIndices={response.showIndices}
      showChevron={response.showChevron}
      showIcon={response.showIcon}
      indexPosition={response.indexPosition}
      iconPosition={response.iconPosition}
      chevronPosition={response.chevronPosition}
      enableChecks={response.enableChecks ?? false}
      renderAsGroup={response.renderAsGroup}
      items={response.items.map((item, index) => ({
        id: `${response.id}:${index}`,
        question: item.question,
        answer: item.answer,
        enableCheck: item.check,
      }))}
      slots={{ renderAnswer: answers => answers.map((block, index) => (
        <div key={`${block.id}:${index}`}>{renderNested(block)}</div>
      )) }}
    />
  );
};

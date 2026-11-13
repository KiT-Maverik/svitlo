import type { ReactElement, ReactNode } from 'react';
import type { ChipProps } from '@mui/material/Chip';
import type { FlashcardFlag, FlashcardFlagIcon, Locale_Languages } from '+@svitlo/contracts/content';
import type { Flashcard_Locale } from '../../../../data/locale/flashcard';
import ListOutlined from '@mui/icons-material/ListOutlined';
import PriorityHighOutlined from '@mui/icons-material/PriorityHighOutlined';
import ChatBubbleOutlineOutlined from '@mui/icons-material/ChatBubbleOutlineOutlined';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import StarOutlined from '@mui/icons-material/StarOutlined';
import BookmarkBorderOutlined from '@mui/icons-material/BookmarkBorderOutlined';
import LightbulbOutlined from '@mui/icons-material/LightbulbOutlined';
import CodeOutlined from '@mui/icons-material/CodeOutlined';
import CheckOutlined from '@mui/icons-material/CheckOutlined';

export interface FlashcardLabel {
  label: ReactNode;
  icon?: ReactElement;
  color?: ChipProps['color'];
}

/** Only known icon tokens can be used in serialized Lesson content. */
const iconByName = {
  list: <ListOutlined />,
  warning: <PriorityHighOutlined />,
  acronym: <ChatBubbleOutlineOutlined />,
  info: <InfoOutlined />,
  star: <StarOutlined />,
  bookmark: <BookmarkBorderOutlined />,
  lightbulb: <LightbulbOutlined />,
  code: <CodeOutlined />,
  check: <CheckOutlined />,
} satisfies Record<FlashcardFlagIcon, ReactElement>;

/** Convert typed, JSON-safe Flashcard metadata into MUI presentation props. */
export function toFlashcardLabel(
  flag: FlashcardFlag<'response', Locale_Languages>,
  messages: Flashcard_Locale,
): FlashcardLabel {
  switch (flag.type) {
    case 'list':
      return { label: String(flag.count), color: 'info', icon: iconByName.list };
    case 'warning':
      return { label: messages.flashcard.flags.warning, color: 'warning', icon: iconByName.warning };
    case 'acronym':
      return { label: flag.value, color: 'secondary', icon: iconByName.acronym };
    case 'custom':
      return {
        label: flag.value,
        color: flag.color,
        icon: flag.icon === undefined ? undefined : iconByName[flag.icon],
      };
    default: {
      const neverFlag: never = flag;
      return neverFlag;
    }
  }
}

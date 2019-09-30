export const MESSAGE_CODE_ADD_FAVORITE = 'I100001';
export const MESSAGE_CODE_DELETE_FAVORITE = 'I100003';
export const MESSAGE_CODE_INVALID_INQUIRYCODE = 'I100005';

export const FAULT_ERROR_CODE = ['I100002', 'I110002', 'E102008', 'E102022', 'E102023'];

export const errors = {
  I100002: {
    title: ['お探しのページまたはファイルは存在しません。'],
    hint: ['お探しのコンテンツは削除されたか、閲覧を制限された可能性があります。'],
  },
  I110002: {
    title: ['他のユーザによる更新がされています。'],
    hint: ['再表示してください。'],
  },
  E102008: {
    title: ['再照会回数の上限を超えたため、再照会できません。'],
    hint: [''],
  },
  E102022: {
    title: ['作成中であるため再照会できません。'],
    hint: [''],
  },
  E102023: {
    title: ['既に営業店照会済みのため、更新できません。'],
    hint: [''],
  },
};

export const SYSTEM_ERROR_DA = 'SYSTEM_ERROR_08';

export const SYSTEM_ERROR_JSOL = 'SYSTEM_ERROR_18';

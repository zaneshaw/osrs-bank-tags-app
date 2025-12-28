export type BankTagData = {
  tagId: string;
  tagName: string;
  tagString: string;
  tagTags: string[];
};

export type CreateBankTagPayload = {
  name: string;
  iconId: string;
  import_string: string;
  layout: boolean;
  tags: string[];
};

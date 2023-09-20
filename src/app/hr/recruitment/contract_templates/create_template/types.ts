export type TemplateListData = {
    id: number;
    template_name: string;
    template: string
  };

  export type TemplateCreateData = {
    template_name: string;
    template: string
  };

  export type TemplateUpdateData = {
    template_name: string;
    template: string
  };

  export type TemplateFormProps = {
    isModelOpen: boolean;
    onModelClose: () => void;
    formInstance: any;
    templateData: TemplateListData;
  };

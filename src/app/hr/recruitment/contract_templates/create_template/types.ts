export type TemplateListData = {
    id: number;
    template_name: string;
    template_content: string;
    template_type: string;
  };

  export type TemplateCreateData = {
    template_name: string;
    template_content: string;
    template_type: string;
  };

  export type TemplateUpdateData = {
    template_name: string;
    template_content: string;
    template_type: string;
  };

  export type TemplateFormProps = {
    isModelOpen: boolean;
    onModelClose: () => void;
    formInstance: any;
    templateData: TemplateListData;
  };

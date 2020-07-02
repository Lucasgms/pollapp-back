export default interface ICreatePollDTO {
  title: string;
  description: string;
  options: JSON;
  is_public: boolean;
  owner_id: string;
}
import IPollOptionDTO from "./IPollOptionDTO";

interface IOptionsDTO {
  options: Array<IPollOptionDTO>;
}

export default interface IPollOptionsDTO {
  options: IOptionsDTO;
}
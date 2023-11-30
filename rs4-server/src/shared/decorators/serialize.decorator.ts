import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';

interface ClassConstructor {
  new (...args: []): {};
}
// decorator to simlify work
//export function Serialize(dto: any){
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

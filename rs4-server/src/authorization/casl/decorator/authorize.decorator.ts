import { applyDecorators, UseGuards } from '@nestjs/common';

import { PoliciesGuard } from '../guards/policy.guard';
import { JwtAuthGuard } from 'src/auth/auth-central/guards/centralToken.guards';

export function CentralUserAuthorized() {
  return applyDecorators(UseGuards(JwtAuthGuard, PoliciesGuard));
}

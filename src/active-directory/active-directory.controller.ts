import { Body, Controller, Post } from '@nestjs/common';
import { ActiveDirectoryService } from './active-directory.service';
import { SigninUserDto } from './dto/loginUser.dto';
import { IsUserMemberOfDto } from './dto/isUserMemberOf.dto';
import { FindUserDto } from './dto/findUser.dto';
import { FindGroupDto } from './dto/findGroup.dto';
import { FindDeletedObjectsDto } from './dto/FindDeletedObjectsDto';
import { FindUserByGroupDto } from './dto/FindUserByGroupDto';
import { GetGroupMembershipForGroupDto } from './dto/GetGroupMembershipForGroupDto';
import { GetGroupMembershipForUserDto } from './dto/GetGroupMembershipForUserDto';
import { GetUsersForGroupDto } from './dto/GetUsersForGroupDto';
import { GroupExistsDto } from './dto/GroupExistsDto';
import { UserExistsDto } from './dto/UserExistsDto';

@Controller('active-directory')
export class ActiveDirectoryController {
  constructor(
    private readonly activeDirectoryService: ActiveDirectoryService,
  ) {}

  @Post('signIn')
  signInActiveDirectory(@Body() signinUserDto: SigninUserDto) {
    return this.activeDirectoryService.signInActiveDirectory(signinUserDto);
  }

  @Post('isUserMemberOf')
  isUserMemberOf(@Body() isUserMemberOfDto: IsUserMemberOfDto) {
    return this.activeDirectoryService.isUserMemberOfAD(isUserMemberOfDto);
  }

  @Post('findUser')
  findUser(@Body() findUserDto: FindUserDto) {
    return this.activeDirectoryService.findUser(findUserDto);
  }

  @Post('findGroup')
  findGroup(@Body() findGroupDto: FindGroupDto) {
    return this.activeDirectoryService.findGroup(findGroupDto);
  }

  @Post('find-deleted')
  findDeleteObjects(@Body() findDeletedObjectsDto: FindDeletedObjectsDto) {
    return this.activeDirectoryService.findDeletedObjects(
      findDeletedObjectsDto,
    );
  }

  @Post('find-group')
  findGroup2(@Body() findUserByGroupDto: FindUserByGroupDto) {
    return this.activeDirectoryService.findGroups(findUserByGroupDto);
  }

  @Post('group-membership-group')
  getGroupMemberShipForGroup(
    @Body() getGroupMembershipForGroupDto: GetGroupMembershipForGroupDto,
  ) {
    return this.activeDirectoryService.getGroupMembershipForGroup(
      getGroupMembershipForGroupDto,
    );
  }

  @Post('group-membership-user')
  getGroupMemberShipForUser(
    @Body() getGroupMembershipForUserDto: GetGroupMembershipForUserDto,
  ) {
    return this.activeDirectoryService.getGroupMembershipForUser(
      getGroupMembershipForUserDto,
    );
  }

  @Post('user-x-group')
  getUsersForGroup(@Body() getUsersForGroupDto: GetUsersForGroupDto) {
    return this.activeDirectoryService.getUsersForGroup(getUsersForGroupDto);
  }

  @Post('group-exists')
  groupExists(@Body() groupExistsDto: GroupExistsDto) {
    return this.activeDirectoryService.groupExists(groupExistsDto);
  }

  @Post('user-exists')
  userExists(@Body() userExistsDto: UserExistsDto) {
    return this.activeDirectoryService.userExists(userExistsDto);
  }
}

import { Injectable } from '@nestjs/common';
import { SigninUserDto } from './dto/loginUser.dto';
import { IsUserMemberOfDto } from './dto/isUserMemberOf.dto';
import { FindGroupDto } from './dto/findGroup.dto';
import { GetUsersForGroupDto } from './dto/GetUsersForGroupDto';
import { GroupExistsDto } from './dto/GroupExistsDto';
import { FindUserByGroupDto } from './dto/FindUserByGroupDto';
import { UserExistsDto } from './dto/UserExistsDto';
import { FindDeletedObjectsDto } from './dto/FindDeletedObjectsDto';
import { GetGroupMembershipForGroupDto } from './dto/GetGroupMembershipForGroupDto';
import { GetGroupMembershipForUserDto } from './dto/GetGroupMembershipForUserDto';
import { FindUserDto } from './dto/findUser.dto';
import ActiveDirectory from 'activedirectory2';
import { ConfigService } from '@nestjs/config';
import { activeDirectoryConfig } from './interface/active-directory-config.interface';

@Injectable()
export class ActiveDirectoryService {
  private ActiveDirectory = null;
  private config = null;
  private activeDirectory = null;

  constructor(
    private configService: ConfigService
  ) {
    this.ActiveDirectory = require('activedirectory2');
    this.config = {
      url: configService.get<activeDirectoryConfig>('URL'),
      baseDN: configService.get<activeDirectoryConfig>('BASEDN'),
      username: configService.get<activeDirectoryConfig>('USERNAME'),
      password: configService.get<activeDirectoryConfig>('PASSWORD'),
    };
    this.activeDirectory = new this.ActiveDirectory(this.config);
  }

  async signInActiveDirectory(
    signinUserDto: SigninUserDto
  ) {
    var ad = this.activeDirectory;
    const { password, email } = signinUserDto;

    ad.authenticate(email, password, function (err, auth) {
      if (err) {
        console.log('ERROR: ' + JSON.stringify(err));
      }

      if (auth) {
        console.log('Authenticated!');
        return signinUserDto;
      } else {
        console.log('Authentication failed!');
      }
    });
  }

  async isUserMemberOfAD(
    isUserMemberOfDto: IsUserMemberOfDto
  ) {
    var ad = this.activeDirectory;

    // var username = 'user@domain.com';
    // var groupName = 'Employees';
    var username = isUserMemberOfDto.username;
    var groupName = isUserMemberOfDto.groupName;
    
    ad.isUserMemberOf(username, groupName, function (err, isMember) {
      if (err) {
        console.log('ERROR: ' + JSON.stringify(err));
        return;
      }

      console.log(username + ' isMemberOf ' + groupName + ': ' + isMember);
    });
  }

  async findUser(
    findUserDto: FindUserDto
  ) { //preguntar
    var ad = this.activeDirectory;

    // Any of the following username types can be searched on
    var userPrincipalName = findUserDto.userPrincipalName;
    var sAMAccountName = findUserDto.sAMAccountName;
    var dn = findUserDto.dn;
    // var dn = 'CN=perez\\, juan,OU=RHHH,OU=usuarios,OU=scz,DC=DEMO,DC=LOCAL';

    // Find user by a userPrincipalName
    ad.findUser(userPrincipalName, function (err, user) {
      if (err) {
        console.log('ERROR: ' + JSON.stringify(err));
        return;
      }

      if (!user) console.log('User: ' + userPrincipalName + ' not found.');
      else console.log(JSON.stringify(user));
    });
  }

  async findGroup(
    findGroupDto: FindGroupDto
  ) {
    var ad = this.activeDirectory;

    // Any of the following group names can be searched on
    // var groupName = 'Employees';
    // var dn = 'CN=Employees,OU=Groups,DC=domain,DC=com'
    var groupName = findGroupDto.groupName;
    var dn = findGroupDto.dn;

    // Find group by common name
    ad.findGroup(groupName, function (err, group) {
      if (err) {
        console.log('ERROR: ' + JSON.stringify(err));
        return;
      }

      if (!group) console.log('Group: ' + groupName + ' not found.');
      else {
        console.log(group);
        console.log('Members: ' + (group.member || []).length);
      }
    });
  }

  async getUsersForGroup(
    getUsersForGroupDto: GetUsersForGroupDto
  ) {
    var ad = this.activeDirectory;
    const { grupo } = getUsersForGroupDto;

    //var groupName = 'Employees';
    var groupName = grupo;

    ad.getUsersForGroup(groupName, function (err, users) {
      if (err) {
        console.log('ERROR: ' + JSON.stringify(err));
        return;
      }

      if (!users) console.log('Group: ' + groupName + ' not found.');
      else {
        console.log(JSON.stringify(users));
      }
    });
  }

  async groupExists(
    groupExistsDto: GroupExistsDto
  ) {
    var ad = this.activeDirectory;
    const { grupo } = groupExistsDto;
    
    var groupName = grupo;
    //var groupName = 'Employees';

    ad.groupExists(groupName, function (err, exists) {
      if (err) {
        console.log('ERROR: ' + JSON.stringify(err));
        return;
      }

      console.log(groupName + ' exists: ' + exists);
    });
  }

  async findGroups(
    findUserByGroupDto: FindUserByGroupDto
  ) {
    var ad = this.activeDirectory;
    const { query } = findUserByGroupDto;
    // var query = 'CN=Admin';

    ad.findGroups(query, function (err, groups) {
      if (err) {
        console.log('ERROR: ' + JSON.stringify(err));
        return;
      }

      if (!groups || groups.length == 0) console.log('No groups found.');
      else {
        console.log('findGroups: ' + JSON.stringify(groups));
      }
    });
  }

  async userExists(
    userExistsDto: UserExistsDto
  ) {
    var ad = this.activeDirectory;
    const { username } = userExistsDto;
    //var username = 'john.smith@domain.com'; //recibir

    ad.userExists(username, function (err, exists) {
      if (err) {
        console.log('ERROR: ' + JSON.stringify(err));
        return;
      }

      console.log(username + ' exists: ' + exists);
    });
  }

  async findDeletedObjects(
    findDeletedObjectsDto: FindDeletedObjectsDto
  ) {
    var ad = this.activeDirectory;
    const { url } = findDeletedObjectsDto;
    //var url = 'ldap://yourdomain.com'; //recibir

    var opts = {
      baseDN: 'ou=Deleted Objects, dc=yourdomain, dc=com',
      filter: 'cn=Bob',
    };
    ad.findDeletedObjects(opts, function (err, result) {
      if (err) {
        console.log('ERROR: ' + JSON.stringify(err));
        return;
      }

      console.log('findDeletedObjects: ' + JSON.stringify(result));
    });
  }

  async getGroupMembershipForGroup(
    getGroupMembershipForGroupDto: GetGroupMembershipForGroupDto,
  ) {
    const { groupName } = getGroupMembershipForGroupDto;
    //var groupName = 'Employees'; //recibir
    var ad = this.activeDirectory;
    ad.getGroupMembershipForGroup(groupName, function (err, groups) {
      if (err) {
        console.log('ERROR: ' + JSON.stringify(err));
        return;
      }

      if (!groups) console.log('Group: ' + groupName + ' not found.');
      else console.log(JSON.stringify(groups));
    });
  }

  async getGroupMembershipForUser(
    getGroupMembershipForUserDto: GetGroupMembershipForUserDto,
  ) {
    const { sAMAccountName } = getGroupMembershipForUserDto;
    //var sAMAccountName = 'john.smith@domain.com';
    var ad = this.activeDirectory;
    ad.getGroupMembershipForUser(sAMAccountName, function (err, groups) {
      if (err) {
        console.log('ERROR: ' + JSON.stringify(err));
        return;
      }

      if (!groups) console.log('User: ' + sAMAccountName + ' not found.');
      else console.log(JSON.stringify(groups));
    });
  }
}
